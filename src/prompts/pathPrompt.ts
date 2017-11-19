import * as chalk from 'chalk';
export default function pathPrompt(featureType: string) {
  return {
    type: 'input',
    name: 'featurePath',
    message: `[${chalk.blue('BestBoy')}] ${chalk.blue(`Where should I put your ${featureType}?`)}`,
    validate(answer: string) {
      if (answer.length < 1) {
        return chalk.red(`I need someplace to put the ${featureType}, please give me a path`);
      }
      return true;
    },
  };
}
