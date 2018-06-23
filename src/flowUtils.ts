import * as recast from 'recast';
import * as flow from 'flow-parser';
import flowConfigParser from 'flow-config-parser';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';
import * as fs from 'fs';
import * as process from 'process';
import * as path from 'path';
import { values, map, forEach, flatten } from 'ramda';
import { transformNode } from './utils';

export function findFlowConfig(dir: string = process.cwd()): string | null {
  const config = path.join(dir, '.flowconfig');
  if (dir === '') {
    return null;
  }
  
  if (fs.existsSync(config)) {
    return config;
  }

  return findFlowConfig(dir.split(path.sep).slice(0,-1).join(path.sep));
}

function getFullLibPath(flowConfigDir: string) {
  return function(libPath: string) {
    return path.join(flowConfigDir, libPath);
  }
}

function getAllFiles(dir: string): string[] {
  return fs.readdirSync(dir).reduce(
    (files, file) => {
      const name = path.join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();
      return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    },
    [],
  );
}

function findTypeLibs(): string[] {
  const flowConfigPath = findFlowConfig();
  if (flowConfigPath) {
    const flowConfigDir = path.dirname(flowConfigPath);
    const flowConfig = flowConfigParser(fs.readFileSync(flowConfigPath, 'utf8'));
    const libPaths: string[] = map(getFullLibPath(flowConfigDir), flowConfig.libs);
    return flatten<string>(map(getAllFiles, libPaths));
  }
  return [];
}

function collectTypeDeclations(target: string): ESTreeNode[] {
  const targetString = fs.readFileSync(target).toString();
  const ast = recast.parse(targetString, {
    parser: flow,
  });

  const declations: ESTreeNode[] = [];

  estraverse.traverse(ast, {
    enter(node: ESTree.Node & ESTreeNode, parent: ESTree.Node) {
      if (node.type === 'DeclareTypeAlias') {
        declations.push(node);
      }
    },
    fallback: 'iteration',
  });

  return declations;
}

function createGenericBestBoyTree(nodes: ESTreeNode[]): BestBoyTree {
  const tree: BestBoyTree = {};
  nodes.forEach(node => {
    const transformedNode = transformNode(node);
    tree[transformedNode.name] = transformedNode;
  });
  return tree;
}

export function replaceGenericWithPrimitive(tree: BestBoyTree) {
  return function(node: BestBoyNode): BestBoyNode {
    if (node.value instanceof Array) {
      node.value = node.value.map(replaceGenericWithPrimitive(tree));
    }
    
    if (tree[node.value as string]) {
      node.value = tree[node.value as string].value;
    }
    return node;
  };
}

function createPrimitiveBestBoyTree(tree: BestBoyTree): BestBoyTree {
  forEach(node => (tree[node.name] = node), map(replaceGenericWithPrimitive(tree), values(tree)));
  return tree;
}


export function getPrimitivesTypes() {
  const primitivesTree = createPrimitiveBestBoyTree(
    createGenericBestBoyTree(flatten<ESTreeNode>(map(collectTypeDeclations, findTypeLibs()))),
  );
  fs.writeFileSync('primitivesTree.json', JSON.stringify(primitivesTree, null, 2));
  return primitivesTree;
}
