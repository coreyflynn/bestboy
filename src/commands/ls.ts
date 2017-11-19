import * as process from 'process';
import * as fs from 'fs';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('ls', 'List the contents of the current directory')
    .action(async (args, callback) => {
      fs.readdir(process.cwd(), (err, items) => {
        const dirs = items
          .filter(item => fs.statSync(item).isDirectory())
          .map(dir => vorpal.chalk.green(dir));
        const files = items
          .filter(item => !fs.statSync(item).isDirectory())
          .map(file => vorpal.chalk.white(file));
        dirs.concat(files).forEach(item => {
          vorpal.log(item);
        });
      });
    });
}
