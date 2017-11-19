import * as path from 'path';
import { createFolderIfNeeded } from '../utils';
import fileWriter from '../fileWriter';

export default function generateIndex(featurePath: string, type: string) {
  createFolderIfNeeded(featurePath);
  fileWriter(
    featurePath,
    'index.js',
    path.join(__dirname, '../../templates/index.js'),
    {
      type,
    },
    true,
  );
}
