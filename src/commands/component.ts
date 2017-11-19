import { applyGenerator } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateComponent from '../generators/generateComponent';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('component [featurePath]')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'component', generateComponent, this);
    });
}
