import { getFeaturePath } from '../utils';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateContainer from '../generators/generateContainer';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('container [featurePath]', 'Generate a container')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      const featurePath = await getFeaturePath(this, args, 'container');
      const { message, color } = generateContainer(featurePath);
      vorpal.log(vorpal.chalk[color](message));
    });
}
