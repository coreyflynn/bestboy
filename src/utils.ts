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
import { findFlowConfig, getPrimitivesTypes, replaceGenericWithPrimitive } from './flowUtils';
import defaultConfig from './defaultConfig';
import pathPrompt from './prompts/pathPrompt';

export function transformNode(node: ESTreeNode) {
  const transformed: BestBoyNode = {
    optional: node.optional,
    type: node.type,
    name: node.id ? node.id.name : node.key ? node.key.name : node.type,
    value: [],
  };
  if (node.type === 'DeclareTypeAlias' && node.right.properties) {
    transformed.value = node.right.properties.map(transformNode);
    return transformed;
  }

  if (node.type === 'DeclareTypeAlias' && !node.right.properties && node.right.type) {
    transformed.value = node.right.type.replace('TypeAnnotation', '');
    return transformed;
  }

  if (node.value && node.value.type === 'GenericTypeAnnotation' && node.value.id) {
    transformed.value = node.value.id.name;
    return transformed;
  }

  if (node.value && node.value.type === 'ObjectTypeAnnotation') {
    transformed.value = node.value.properties.map(transformNode);
    return transformed;
  }

  if (node.value && node.value.type === 'UnionTypeAnnotation' && node.value.types) {
    transformed.value = node.value.types[0].type.replace('TypeAnnotation', '');
    return transformed;
  }

  if (node.value && node.value.type === 'ArrayTypeAnnotation' && node.value.elementType) {
    const { value: { elementType } } = node;
    if (elementType.type === 'GenericTypeAnnotation' && elementType.id) {
      transformed.value = `${elementType.id.name}Array`;
    } else {
      transformed.value = `${elementType.type.replace('TypeAnnotation', '')}Array`;
    }
    return transformed;
  }

  transformed.value = node.value && node.value.type
    ? node.value.type.replace('TypeAnnotation', '')
    : [];
  return transformed;
}

function generateFakeValue(valueType: string): any {
  if (valueType.includes('Array')) {
    return [generateFakeValue(valueType.replace('Array', ''))];
  }

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
    case 'Function':
      return () => {};
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
      } else {
        props[name] = generateFakeValue(value as string);
      }
    });
  }
  return props;
}

export function createPropVariations(target: string, vorpal?: Vorpal) {
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
    enter(node: any, parent: ESTree.Node) {
      if (node.type === 'TypeAlias' && node.id.name === 'Props') {
        root.value.properties = node.right.properties;
      }
    },
    fallback: 'iteration',
  });

  let props = transformNode(root);
  if (vorpal && vorpal.primitiveTypes) {
    props = replaceGenericWithPrimitive(vorpal.primitiveTypes)(props);
  }
  return [nodesToRandomProps(props.value, true), nodesToRandomProps(props.value, false)];
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
    config: defaultConfig,
    filepath: path.join(os.homedir(), '.bestboyrc'),
  };
  vorpal.config = config;
  vorpal.configPath = filepath;
  return setBestBoyPrompt(updateFlowTypes(vorpal));
}

export function updateFlowTypes(vorpal: Vorpal): Vorpal {
  const candidateConfig = findFlowConfig();

  if (!vorpal.flowConfigPath) {
    vorpal.log(vorpal.chalk.blue(`building types from  ${candidateConfig}`));
    vorpal.flowConfigPath = candidateConfig;
    vorpal.primitiveTypes = getPrimitivesTypes();
    return vorpal;
  }

  if (vorpal.flowConfigPath && candidateConfig && vorpal.flowConfigPath !== candidateConfig) {
    const  currentPathParts = path.dirname(vorpal.flowConfigPath).split('/');
    const  candidatePathParts = path.dirname(vorpal.flowConfigPath).split('/');

    const currentConfigDepth = currentPathParts.length;
    const candidateConfigDepth = candidatePathParts.length;
    if (candidateConfigDepth >= currentConfigDepth) {
      vorpal.log(vorpal.chalk.blue(`building types from  ${candidateConfig}`));
      vorpal.flowConfigPath = candidateConfig;
      vorpal.primitiveTypes = getPrimitivesTypes();
      return vorpal;
    }

    const candidateIsOffPath = candidatePathParts
      .filter((item, idx) => item === currentPathParts[idx]).length > 0;

    if (candidateIsOffPath) {
      vorpal.log(vorpal.chalk.blue(`building types from ${candidateConfig}`));
      vorpal.flowConfigPath = candidateConfig;
      vorpal.primitiveTypes = getPrimitivesTypes();
      return vorpal;
    }
  }
  return vorpal;
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
    const { message, color } = generator(featurePath, name, vorpal.config, vorpal);
    vorpal.log(vorpal.chalk[color](message));
  }
}
