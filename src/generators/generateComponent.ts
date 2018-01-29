import * as path from 'path';
import * as fs from 'fs';
import { createFolderIfNeeded } from '../utils';
import generateIndex from './generateIndex';
import fileWriter from '../fileWriter';

export default function generateComponent(
  featurePath: string,
  name: string,
  config: Config,
): FileWriterOutput {
  createFolderIfNeeded(featurePath);

  if (!fs.existsSync(path.join(featurePath, 'index.js'))) {
    generateIndex(featurePath, 'component');
  }

  const fileExtension = config.fileExtensions.component;

  return fileWriter(
    featurePath,
    `component.${fileExtension}`,
    path.join(__dirname, '../../templates/component.jsx'),
    {
      name,
    },
  );
}
