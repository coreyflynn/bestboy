import { applyGenerator } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateComponentTests from '../generators/generateComponentTests';
import generateActionTests from '../generators/generateActionTests';

export default function command(vorpal: Vorpal) {
  vorpal
    .command('test actions [featurePath]', 'Generate actions tests')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'actions', generateActionTests, this);
    });

  vorpal
    .command('test component [featurePath]', 'Generate actions tests')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'component', generateComponentTests, this);
    });
}
