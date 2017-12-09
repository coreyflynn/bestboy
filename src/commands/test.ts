import { applyGenerator } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateComponentTests from '../generators/generateComponentTests';
import generateActionTests from '../generators/generateActionTests';
import generateReducerTests from '../generators/generateReducerTests';

export default function command(vorpal: Vorpal) {
  vorpal
    .command('test actions [featurePath]', 'Generate actions tests')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'actions', generateActionTests, this);
    });

  vorpal
    .command('test reducer [featurePath]', 'Generate reducer tests')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'actions', generateReducerTests, this);
    });

  vorpal
    .command('test component [featurePath]', 'Generate component tests')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      await applyGenerator(vorpal, args, 'component', generateComponentTests, this);
    });
}
