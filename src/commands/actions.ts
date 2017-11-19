import { applyGenerator } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateActions from '../generators/generateActions';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('actions [featurePath]', 'Generate actions')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'actions', generateActions, this);
    });
}
