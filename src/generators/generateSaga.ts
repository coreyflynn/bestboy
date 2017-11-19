import * as path from 'path';
import { createFolderIfNeeded } from '../utils';
import fileWriter from '../fileWriter';

export default function generateSaga(featurePath: string, name: string): FileWriterOutput {
  createFolderIfNeeded(featurePath);
  return fileWriter(featurePath, 'saga.js', path.join(__dirname, '../../templates/saga.js'), {
    name: name.toLowerCase(),
  });
}
