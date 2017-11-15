#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');
const commander = require('commander');
const path = require('path');
const pkg = require('./package.json');
const questions = require('./questions');
const { createFolderIfNeeded, createPropVariations } = require('./utils');
const fileWriter = require('./fileWriter');
const generateActionTests = require('./generateActionTests');

commander
  .version(pkg.version)
  .usage('feature-path')
  .parse(process.argv);

const predefindPath = commander.args.length && commander.args[0];

inquirer.prompt(predefindPath ? questions.slice(1) : questions).then(function(answers) {
  if (predefindPath) answers.path = predefindPath;
  const name = answers.path.match(/([^\/]*)\/*$/)[1];

  createFolderIfNeeded(answers.path);

  fileWriter(
    answers.path,
    'index.js',
    path.join(__dirname, 'templates/index.js'),
    {
      type: answers.parts.includes('Container') ? 'container' : 'component',
    },
    true,
  );

  if (answers.parts.includes('Container')) {
    fileWriter(answers.path, 'container.js', path.join(__dirname, 'templates/container.js'));
  }

  if (answers.parts.includes('Component')) {
    fileWriter(answers.path, 'component.jsx', path.join(__dirname, 'templates/component.jsx'), {
      name,
    });
  }

  if (answers.parts.includes('Actions')) {
    fileWriter(answers.path, 'actions.js', path.join(__dirname, 'templates/actions.js'), {
      name: name.toLowerCase(),
    });
  }

  if (answers.parts.includes('Reducer')) {
    fileWriter(answers.path, 'reducer.js', path.join(__dirname, 'templates/reducer.js'), {
      name: name.toLowerCase(),
    });
  }

  if (answers.parts.includes('Saga')) {
    fileWriter(answers.path, 'saga.js', path.join(__dirname, 'templates/saga.js'), {
      name: name.toLowerCase(),
    });
  }

  if (answers.parts.includes('Component Tests')) {
    const componentPath = path.join(answers.path, 'component.jsx');
    const testDir = path.join(answers.path, '__tests__');
    createFolderIfNeeded(testDir);

    if (fs.existsSync(componentPath)) {
      fileWriter(
        testDir,
        'component.test.js',
        path.join(__dirname, 'templates/testImports.js'),
        {},
        true,
      );

      fileWriter(
        testDir,
        'component.test.js',
        path.join(__dirname, 'templates/test.js'),
        {
          describe: `${name} with required props`,
          props: JSON.stringify(createPropVariations(componentPath)[0]),
        },
        true,
        true,
      );

      fileWriter(
        testDir,
        'component.test.js',
        path.join(__dirname, 'templates/test.js'),
        {
          describe: `${name} with required and optional props`,
          props: JSON.stringify(createPropVariations(componentPath)[1]),
        },
        true,
        true,
      );
    }
  }

  if (answers.parts.includes('Action Tests')) {
    const actionsPath = path.join(answers.path, 'actions.js');
    const testDir = path.join(answers.path, '__tests__');
    createFolderIfNeeded(testDir);
    if (fs.existsSync(actionsPath)) {
      generateActionTests(actionsPath, testDir);
    }
  }
});
