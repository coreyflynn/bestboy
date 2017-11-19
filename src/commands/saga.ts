import { applyGenerator } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateSaga from '../generators/generateSaga';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('saga [featurePath]')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'saga', generateSaga, this);
    });
}
