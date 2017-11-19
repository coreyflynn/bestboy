import * as path from 'path';
import { createFolderIfNeeded } from '../utils';
import fileWriter from '../fileWriter';

export default function generateReducer(featurePath: string, name: string): FileWriterOutput {
  createFolderIfNeeded(featurePath);
  return fileWriter(featurePath, 'reducer.js', path.join(__dirname, '../../templates/reducer.js'), {
    name: name.toLowerCase(),
  });
}
