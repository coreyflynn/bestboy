#!/usr/bin/env node
const commander = require('commander');
const recast = require('recast');
const flow = require('flow-parser');
const estraverse = require('estraverse-fb');
const faker = require('faker');
const fs = require('fs');
const path = require('path');
const fileWriter = require('./fileWriter');

function getImport(node) {
  return node.declaration.declarations[0].id.name;
}

function getType(node) {
  return node.declaration.declarations[0].init.arguments[0].value;
}

function getExampleInitArguments(node, argumentNumber) {
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
        break;
      case 'ObjectExpression':
        const payload = {};
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

function getPayload(node) {
  return getExampleInitArguments(node, 1);
}

function getMeta(node) {
  return getExampleInitArguments(node, 2);
}

function getTestDataFromActionFile(target) {
  const targetString = fs.readFileSync(target).toString();
  const ast = recast.parse(targetString, {
    parser: flow,
  });

  const tests = [];

  estraverse.traverse(ast, {
    enter(node, parent) {
      if (node.type === 'ExportNamedDeclaration') {
        if (node.declaration.declarations[0].init.callee.name === 'createAction') {
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

commander.parse(process.argv);

tests = getTestDataFromActionFile(commander.args[0]);

fileWriter(
  __dirname,
  'actionTests.js',
  path.join(__dirname, 'templates/actionTestImport.js'),
  { actions: tests.map(test => test.import).join(',') },
  true,
  true,
);

tests.forEach(test => {
  fileWriter(
    __dirname,
    'actionTests.js',
    path.join(__dirname, 'templates/actionTests.js'),
    test,
    true,
    true,
  );
});
