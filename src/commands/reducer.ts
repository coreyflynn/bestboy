import { applyGenerator } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateReducer from '../generators/generateReducer';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('reducer [featurePath]')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'reducer', generateReducer, this);
    });
}
