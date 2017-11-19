import * as process from 'process';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('pwd', 'List the location of the current directory')
    .action(async (args, callback) => {
      vorpal.log(vorpal.chalk.white(process.cwd()));
    });
}
