import { getFeaturePath, applyGenerator } from '../utils';
import featurePrompt from '../prompts/featurePrompt';
import * as fsAutocomplete from 'vorpal-autocomplete-fs';
import generateActions from '../generators/generateActions';
import generateComponent from '../generators/generateComponent';
import generateContainer from '../generators/generateContainer';
import generateReducer from '../generators/generateReducer';
import generateSaga from '../generators/generateSaga';
import generateActionTests from '../generators/generateActionTests';
import generateComponentTests from '../generators/generateComponentTests';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('feature [featurePath]', 'Interactively generate part or all of a feature')
    .autocomplete(fsAutocomplete())
    .action(async function(args, callback) {
      const featurePath = await getFeaturePath(this, args, 'feature');
      args.featurePath = featurePath;

      const answers: VorpalAnswers = await this.prompt(featurePrompt());

      if (answers.parts && answers.parts.find(a => a === 'Actions' || a === 'All')) {
        await applyGenerator(vorpal, args, 'actions', generateActions, this);
      }

      if (answers.parts && answers.parts.find(a => a === 'Component' || a === 'All')) {
        await applyGenerator(vorpal, args, 'component', generateComponent, this);
      }

      if (answers.parts && answers.parts.find(a => a === 'Container' || a === 'All')) {
        const featurePath = await getFeaturePath(this, args, 'container');
        const { message, color } = generateContainer(featurePath);
        vorpal.log(vorpal.chalk[color](message));
      }

      if (answers.parts && answers.parts.find(a => a === 'Reducer' || a === 'All')) {
        await applyGenerator(vorpal, args, 'reducer', generateReducer, this);
      }

      if (answers.parts && answers.parts.find(a => a === 'Saga' || a === 'All')) {
        await applyGenerator(vorpal, args, 'saga', generateSaga, this);
      }

      if (answers.parts && answers.parts.find(a => a === 'Component Tests' || a === 'All')) {
        await applyGenerator(vorpal, args, 'component tests', generateComponentTests, this);
      }

      if (answers.parts && answers.parts.find(a => a === 'Action Tests' || a === 'All')) {
        await applyGenerator(vorpal, args, 'actions tests', generateActionTests, this);
      }
    });
}
