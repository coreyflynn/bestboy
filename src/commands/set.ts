import * as fs from 'fs';
import { setConfig } from '../utils';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('set <key> <value>', 'set a value in the Best Boy config')
    .action(async (args, callback) => {
      const { key, value } = args;
      setConfig(vorpal, key, value);
      fs.writeFileSync(vorpal.configPath, JSON.stringify(vorpal.config, null, 2));
    });
}
