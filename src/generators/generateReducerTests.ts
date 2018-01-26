import * as fs from 'fs';
import * as path from 'path';
import fileWriter from '../fileWriter';
import { createFolderIfNeeded } from '../utils';
import { getTestDataFromActionFile } from '../testUtils';

export default function generateActionTests(featurePath: string): FileWriterOutput {
  const testDir = path.join(featurePath, '__tests__');
  const actionsPath = path.join(featurePath, 'actions.js');
  const reducerPath = path.join(featurePath, 'reducer.js');
  createFolderIfNeeded(testDir);

  if (!fs.existsSync(reducerPath)) {
    return { message: 'I could not find a reducer to test!', color: 'red' };
  }

  if (fs.existsSync(actionsPath)) {
    try {
      const tests = getTestDataFromActionFile(actionsPath);

      fileWriter(
        testDir,
        'reducer.test.js',
        path.join(__dirname, '../../templates/reducerTestImports.js'),
        { actions: tests.map(test => test.import).join(',') },
        true,
        false,
      );

      tests.forEach(test => {
        fileWriter(
          testDir,
          'reducer.test.js',
          path.join(__dirname, '../../templates/reducerTests.js'),
          test,
          true,
          true,
        );
      });
      return { message: `wrote ${path.join(testDir, 'reducer.test.js')}`, color: 'green' };
    } catch (err) {
      return { message: err.message, color: 'red' };
    }
  }
  return { message: 'I could not find any actions to test!', color: 'red' };
}
