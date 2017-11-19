import { getConfig, getConfigKeyPaths } from '../utils';

export default function command(vorpal: Vorpal) {
  return vorpal
    .command('get <key>', 'get a value in the Best Boy config')
    .autocomplete(() => getConfigKeyPaths(vorpal))
    .action(async (args, callback) => {
      const { key } = args;
      vorpal.log(vorpal.chalk.blue(JSON.stringify(getConfig(vorpal, key), null, 2)));
    });
}
