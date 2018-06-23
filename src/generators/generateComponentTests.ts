import * as path from 'path';
import * as fs from 'fs';
import * as toSource from 'tosource';
import { createFolderIfNeeded, createPropVariations } from '../utils';
import fileWriter from '../fileWriter';

export default function generateComponentTests(
  featurePath: string,
  name: string,
  config: Config,
  vorpal: Vorpal,
): FileWriterOutput {
  const componentFileExtension = config.fileExtensions.component;
  const componentPath = path.join(featurePath, `component.${componentFileExtension}`);
  const testDir = path.join(featurePath, '__tests__');
  createFolderIfNeeded(testDir);

  if (fs.existsSync(componentPath)) {
    try {
      const testFileExtension = config.fileExtensions.componentTests;
      const testFileName = `component.test.${testFileExtension}`;
      fileWriter(
        testDir,
        testFileName,
        path.join(__dirname, '../../templates/testImports.js'),
        {
          imports: config.imports.componentTests,
          wrapper: config.wrappers.componentTests,
        },
        true,
      );

      fileWriter(
        testDir,
        testFileName,
        path.join(__dirname, '../../templates/test.js'),
        {
          describe: `${name} with required props`,
          props: toSource(createPropVariations(componentPath, vorpal)[0]),
        },
        true,
        true,
      );

      fileWriter(
        testDir,
        testFileName,
        path.join(__dirname, '../../templates/test.js'),
        {
          describe: `${name} with required and optional props`,
          props: toSource(createPropVariations(componentPath, vorpal)[1]),
        },
        true,
        true,
      );
      return { message: `wrote ${path.join(testDir, testFileName)}`, color: 'green' };
    } catch (err) {
      return { message: err.message, color: 'red' };
    }
  }
  return { message: 'I could not find a component to test!', color: 'red' };
}
