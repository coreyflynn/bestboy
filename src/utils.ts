import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';
import * as recast from 'recast';
import * as flow from 'flow-parser';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';
import * as faker from 'faker';
import * as chalk from 'chalk';
import * as cosmiconfig from 'cosmiconfig';
import * as objectPath from 'object-path';
import pathPrompt from './prompts/pathPrompt';

interface BestBoyNode {
  name: string,
  optional: boolean,
  value: BestBoyNode[] | string,
}

interface ESTreeNode {
  type: string,
  optional: boolean,
  value: {
    type: string,
    properties: ESTreeNode[],
  },
  key: {
    name: string,
  },
  id: {
    name: string,
  },
  right: {
    properties: any,
  },
}

interface Props {
  [key: string]: any,
}

function transformNode(node: ESTreeNode) {
  const transformed: BestBoyNode = {
    optional: node.optional,
    name: node.key.name,
    value: [],
  };
  if (node.value.type === 'ObjectTypeAnnotation') {
    transformed.value = node.value.properties.map(transformNode);
  } else {
    transformed.value = node.value.type.replace('TypeAnnotation', '');
  }
  return transformed;
}

function generateFakeValue(valueType: string) {
  switch (valueType) {
    case 'Boolean':
      return faker.random.boolean();
    case 'Number':
      return faker.random.number();
    case 'String':
      return faker.random.word();
    case 'Array':
      return [];
    case 'Generic':
      return {};
    case 'NullLiteral':
      return null;
    case 'Nullable':
      return null;
    case 'Void':
      return undefined;
    default:
      return undefined;
  }
}

function nodesToRandomProps(nodes: BestBoyNode[] | string, excludeOptionals = true): Props {
  const props: Props = {};

  if (nodes instanceof Array) {
    nodes.forEach(node => {
      if (excludeOptionals && node.optional) return;

      const { name, value } = node;
      if (value instanceof Array) {
        props[name] = nodesToRandomProps(value);
      }
      if (value instanceof String) {
        props[name] = generateFakeValue(value);
      }
    });
  }
  return props;
}

export function createPropVariations(target: string) {
  const targetString = fs.readFileSync(target).toString();
  const ast = recast.parse(targetString, {
    parser: flow,
  });

  const root: ESTreeNode = {
    type: 'root',
    optional: false,
    id: {
      name: 'root',
    },
    right: {
      properties: [],
    },
    key: {
      name: 'props',
    },
    value: {
      type: 'ObjectTypeAnnotation',
      properties: [],
    },
  };

  estraverse.traverse(ast, {
    enter(node: ESTree.Node & ESTreeNode, parent: ESTree.Node) {
      if (node.type === 'TypeAlias' && node.id.name === 'Props') {
        root.value.properties = node.right.properties;
      }
    },
    fallback: 'iteration',
  });

  const props = transformNode(root).value;
  return [nodesToRandomProps(props, true), nodesToRandomProps(props, false)];
}

export function createFolderIfNeeded(path: string) {
  if (fs.existsSync(path)) return;
  mkdirp.sync(path);
}

export async function getFeaturePath(
  vorpal: Vorpal,
  args: VorpalArgs,
  prompt: string,
): Promise<string> {
  let { featurePath } = args;
  if (featurePath === undefined) {
    const answer: VorpalAnswers = await vorpal.prompt(pathPrompt(prompt));
    featurePath = answer.featurePath;
  }
  return featurePath;
}

export function setBestBoyPrompt(vorpal: Vorpal): Vorpal {
  return vorpal.delimiter(
    `[${chalk.blue('BestBoy')}]─[${chalk.cyan(path.basename(process.cwd()))}]`,
  );
}

export function bootstrap(vorpal: Vorpal): Vorpal {
  const { config, filepath } = cosmiconfig('bestboy', { sync: true }).load(process.cwd()) || {
    config: {},
    filepath: path.join(os.homedir(), '.bestboyrc'),
  };
  vorpal.config = config;
  vorpal.configPath = filepath;
  return setBestBoyPrompt(vorpal);
}

export function setConfig(vorpal: Vorpal, keypath: string, value: any) {
  objectPath.set(vorpal.config, keypath, value);
}

export function getConfig(vorpal: Vorpal, keypath: string): any {
  return objectPath.get(vorpal.config, keypath);
}

export function deleteConfig(vorpal: Vorpal, keypath: string): any {
  return objectPath.del(vorpal.config, keypath);
}

function findKeyPaths(obj: { [key: string]: any }, basePath: string, foundPaths: string[]) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] === 'object') {
        foundPaths.push(`${basePath}${basePath === '' ? '' : '.'}${property}`);
        findKeyPaths(
          obj[property],
          `${basePath}${basePath === '' ? '' : '.'}${property}`,
          foundPaths,
        );
      } else {
        foundPaths.push(`${basePath}${basePath === '' ? '' : '.'}${property}`);
      }
    }
  }
}

export function getConfigKeyPaths(vorpal: Vorpal): string[] {
  const foundPaths: string[] = [];
  findKeyPaths(vorpal.config, '', foundPaths);
  return foundPaths;
}

export async function applyGenerator(
  vorpal: Vorpal,
  args: VorpalArgs,
  prompt: string,
  generator: NameGeneratorFunction,
  context: Vorpal,
) {
  const featurePath = await getFeaturePath(context, args, prompt);
  const match = featurePath.match(/([^\/]*)\/*$/);
  if (match) {
    const name = match[1];
    const { message, color } = generator(featurePath, name);
    vorpal.log(vorpal.chalk[color](message));
  }
}
