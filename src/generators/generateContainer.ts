import * as path from 'path';
import { createFolderIfNeeded } from '../utils';
import generateIndex from './generateIndex';
import fileWriter from '../fileWriter';

export default function generateContainer(featurePath: string): FileWriterOutput {
  createFolderIfNeeded(featurePath);
  generateIndex(featurePath, 'container');
  return fileWriter(
    featurePath,
    'container.js',
    path.join(__dirname, '../../templates/container.js'),
  );
}
