import * as path from 'path';
import { createFolderIfNeeded } from '../utils';
import fileWriter from '../fileWriter';

export default function generateActions(featurePath: string, name: string): FileWriterOutput {
  createFolderIfNeeded(featurePath);
  return fileWriter(featurePath, 'actions.js', path.join(__dirname, '../../templates/actions.js'), {
    name: name.toLowerCase(),
  });
}
