const recast = require('recast');
const flow = require('flow-parser');
const estraverse = require('estraverse-fb');
const fs = require('fs');

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

function extractProps(target) {
  const targetString = fs.readFileSync(target).toString();
  const ast = recast.parse(targetString, {
    parser: flow
  });

  let props = {
    key: {
      name: 'props'
    },
    value: {
      type: 'ObjectTypeAnnotation',
      properties: []
    }
  };

  estraverse.traverse(ast, {
    enter(node, parent) {
      if (node.type === 'TypeAlias' && node.id.name === 'Props') {
        props.value.properties = node.right.properties;
      }
    },
    fallback: 'iteration'
  });

  return transformNode(props);
}

module.exports = extractProps;
