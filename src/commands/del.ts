import * as fs from 'fs';
import { deleteConfig, getConfigKeyPaths } from '../utils';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('delete <key>', 'delete a value in the Best Boy config')
    .autocomplete(() => getConfigKeyPaths(vorpal))
    .action(async (args, callback) => {
      const { key } = args;
      deleteConfig(vorpal, key);
      fs.writeFileSync(vorpal.configPath, JSON.stringify(vorpal.config, null, 2));
    });
}
