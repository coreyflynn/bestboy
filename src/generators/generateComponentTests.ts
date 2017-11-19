import * as path from 'path';
import * as fs from 'fs';
import { createFolderIfNeeded, createPropVariations } from '../utils';
import fileWriter from '../fileWriter';

export default function generateComponentTests(
  featurePath: string,
  name: string,
): FileWriterOutput {
  const componentPath = path.join(featurePath, 'component.jsx');
  const testDir = path.join(featurePath, '__tests__');
  createFolderIfNeeded(testDir);

  if (fs.existsSync(componentPath)) {
    try {
      fileWriter(
        testDir,
        'component.test.js',
        path.join(__dirname, '../../templates/testImports.js'),
        {},
        true,
      );

      fileWriter(
        testDir,
        'component.test.js',
        path.join(__dirname, '../../templates/test.js'),
        {
          describe: `${name} with required props`,
          props: JSON.stringify(createPropVariations(componentPath)[0]),
        },
        true,
        true,
      );

      fileWriter(
        testDir,
        'component.test.js',
        path.join(__dirname, '../../templates/test.js'),
        {
          describe: `${name} with required and optional props`,
          props: JSON.stringify(createPropVariations(componentPath)[1]),
        },
        true,
        true,
      );
      return { message: `wrote ${path.join(testDir, 'component.test.js')}`, color: 'green' };
    } catch (err) {
      return { message: err.message, color: 'red' };
    }
  }
  return { message: 'I could not find a component to test!', color: 'red' };
}
