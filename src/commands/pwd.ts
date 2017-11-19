import * as process from 'process';

export default function command(vorpal: Vorpal) {
  return vorpal.command('pwd').action(async (args, callback) => {
    vorpal.log(vorpal.chalk.white(process.cwd()));
  });
}
