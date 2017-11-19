#!/usr/bin/env node
import * as recast from 'recast';
import * as flow from 'flow-parser';
import * as estraverse from 'estraverse';
import * as faker from 'faker';
import * as fs from 'fs';
import * as path from 'path';
import fileWriter from '../fileWriter';

interface Property {
  name: string,
  key: {
    name: string,
  },
}

interface Argument {
  value: any,
  body: {
    type: string,
    property: Property,
    properties: Property[],
  },
}

interface Declaration {
  id: {
    name: string,
  },
  init: {
    arguments: Argument[],
    callee: {
      name: string,
    },
  },
}

interface Node {
  declaration: {
    declarations: Declaration[],
  },
}

type ExampleInitArgs = { input: string, output: string, equalityCheck: string } | undefined;

interface Test {
  import: string,
  type: string,
  payload: ExampleInitArgs,
  meta: ExampleInitArgs,
}

function getImport(node: Node) {
  return node.declaration.declarations[0].id.name;
}

function getType(node: Node): string {
  return node.declaration.declarations[0].init.arguments[0].value;
}

function getExampleInitArguments(node: Node, argumentNumber: number): ExampleInitArgs {
  if (node.declaration.declarations[0].init.arguments[argumentNumber]) {
    const body = node.declaration.declarations[0].init.arguments[argumentNumber].body;
    switch (body.type) {
      case 'Identifier':
        const indetifierValue = faker.random.word();
        return {
          input: `'${indetifierValue}'`,
          output: `'${indetifierValue}'`,
          equalityCheck: '.toBe',
        };
      case 'MemberExpression':
        const memberValue = faker.random.word();
        return {
          input: JSON.stringify({ [body.property.name]: memberValue }),
          output: `'${memberValue}'`,
          equalityCheck: '.toBe',
        };
      case 'ObjectExpression':
        const payload: { [key: string]: string } = {};
        body.properties.forEach(property => {
          payload[property.key.name] = faker.random.word();
        });
        const stringPayload = JSON.stringify(payload);
        return { input: stringPayload, output: stringPayload, equalityCheck: '.toEqual' };

      default:
        console.log('unknown payload argument');
        break;
    }
  }
}

function getPayload(node: Node) {
  return getExampleInitArguments(node, 1);
}

function getMeta(node: Node) {
  return getExampleInitArguments(node, 2);
}

function getTestDataFromActionFile(target: string) {
  const targetString = fs.readFileSync(target).toString();
  const ast = recast.parse(targetString, {
    parser: flow,
  });

  const tests: Test[] = [];

  estraverse.traverse(ast, {
    enter(node: any, parent) {
      if (node.type === 'ExportNamedDeclaration') {
        if (
          node.declaration &&
          node.declaration.declarations[0].init.callee.name === 'createAction'
        ) {
          tests.push({
            import: getImport(node),
            type: getType(node),
            payload: getPayload(node),
            meta: getMeta(node),
          });
        }
      }
    },
    fallback: 'iteration',
  });

  return tests;
}

export default function generateActionTests(featurePath: string): FileWriterOutput {
  const testDir = path.join(featurePath, '__tests__');
  const actionsPath = path.join(featurePath, 'actions.js');

  if (fs.existsSync(actionsPath)) {
    try {
      const tests = getTestDataFromActionFile(actionsPath);

      fileWriter(
        testDir,
        'actions.test.js',
        path.join(__dirname, '../../templates/actionTestImport.js'),
        { actions: tests.map(test => test.import).join(',') },
        true,
        false,
      );

      tests.forEach(test => {
        console.log(test);
        fileWriter(
          testDir,
          'actions.test.js',
          path.join(__dirname, '../../templates/actionTests.js'),
          test,
          true,
          true,
        );
      });
      return { message: `wrote ${path.join(testDir, 'actions.test.js')}`, color: 'green' };
    } catch (err) {
      return { message: err.message, color: 'red' };
    }
  }
  return { message: 'I could not find any actions to test!', color: 'red' };
}
