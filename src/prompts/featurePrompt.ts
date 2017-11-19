import * as chalk from 'chalk';
export default function featurePrompt() {
  return {
    type: 'checkbox',
    message: 'What parts of the feature do you need?',
    name: 'parts',
    choices: [
      {
        name: 'All',
      },
      {
        name: 'Component',
      },
      {
        name: 'Container',
      },
      {
        name: 'Actions',
      },
      {
        name: 'Reducer',
      },
      {
        name: 'Saga',
      },
      {
        name: 'Component Tests',
      },
      {
        name: 'Action Tests',
      },
    ],
    validate(answer: string[]) {
      if (answer.length < 1) {
        return chalk.red('You must choose at one.');
      }
      return true;
    },
  };
}
