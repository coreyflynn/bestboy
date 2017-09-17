module.exports = [
  {
    type: 'input',
    name: 'path',
    message: 'Where should I put your feature?',
    validate: function(answer) {
      if (answer.length < 1) {
        return 'I need someplace to put the feature, please give me a path';
      }
      return true;
    },
  },
  {
    type: 'checkbox',
    message: 'What parts of the feature do you need?',
    name: 'parts',
    choices: [
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
    ],
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must choose at one.';
      }
      return true;
    },
  },
];
