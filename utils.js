const mkdirp = require('mkdirp');
const fs = require('fs');
const recast = require('recast');
const flow = require('flow-parser');
const estraverse = require('estraverse-fb');
const faker = require('faker');

function createFolderIfNeeded(path) {
  if (fs.existsSync(path)) return;
  mkdirp.sync(path);
}

function transformNode(node) {
  const transformed = {};
  transformed.name = node.key.name;
  if (node.value.type === 'ObjectTypeAnnotation') {
    transformed.value = node.value.properties.map(transformNode);
  } else {
    transformed.value = node.value.type.replace('TypeAnnotation', '');
  }
  transformed.optional = node.optional;
  return transformed;
}

function generateFakeValue(valueType) {
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

function nodesToRandomProps(nodes, excludeOptionals = true) {
  const props = {};
  nodes.forEach(node => {
    if (excludeOptionals && node.optional) return;

    const { name, value } = node;
    if (node.value instanceof Array) {
      props[name] = nodesToRandomProps(value);
    } else {
      props[name] = generateFakeValue(value);
    }
  });
  return props;
}

function createPropVariations(target) {
  const targetString = fs.readFileSync(target).toString();
  const ast = recast.parse(targetString, {
    parser: flow,
  });

  let root = {
    key: {
      name: 'props',
    },
    value: {
      type: 'ObjectTypeAnnotation',
      properties: [],
    },
  };

  estraverse.traverse(ast, {
    enter(node, parent) {
      if (node.type === 'TypeAlias' && node.id.name === 'Props') {
        root.value.properties = node.right.properties;
      }
    },
    fallback: 'iteration',
  });

  const props = transformNode(root).value;
  return [nodesToRandomProps(props, true), nodesToRandomProps(props, false)];
}

module.exports = {
  createFolderIfNeeded,
  createPropVariations,
};
