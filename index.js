#!/usr/bin/env node

const inquirer = require('inquirer');
const commander = require('commander');
const pkg = require('./package.json');
const questions = require('./questions');
const { createFolderIfNeeded } = require('./utils');
const fileWriter = require('./fileWriter');

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
    './templates/index.js',
    {
      type: answers.parts.includes('Container') ? 'container' : 'component',
    },
    true,
  );

  if (answers.parts.includes('Container')) {
    fileWriter(answers.path, 'container.js', './templates/container.js');
  }

  if (answers.parts.includes('Component')) {
    fileWriter(answers.path, 'component.jsx', './templates/component.jsx', { name });
  }

  if (answers.parts.includes('Actions')) {
    fileWriter(answers.path, 'actions.js', './templates/actions.js', { name: name.toLowerCase() });
  }

  if (answers.parts.includes('Reducer')) {
    fileWriter(answers.path, 'reducer.js', './templates/reducer.js', { name: name.toLowerCase() });
  }

  if (answers.parts.includes('Saga')) {
    fileWriter(answers.path, 'saga.js', './templates/saga.js', { name: name.toLowerCase() });
  }
});
