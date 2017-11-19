import { applyGenerator } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateComponentTests from '../generators/generateComponentTests';
import generateActionTests from '../generators/generateActionTests';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('test [type] [featurePath]')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      const { type } = args;
      if (type === 'component') {
        await applyGenerator(vorpal, args, 'component', generateComponentTests, this);
      }
      if (type === 'actions') {
        await applyGenerator(vorpal, args, 'component', generateActionTests, this);
      }
    });
}
