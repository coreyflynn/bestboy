import * as process from 'process';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import { setBestBoyPrompt } from '../utils';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('cd [dir]', 'Change directory')
    .autocomplete(fsAutocomplete())
    .action(async (args, callback) => {
      const { dir } = args;
      process.chdir(dir);
      setBestBoyPrompt(vorpal);
    });
}
