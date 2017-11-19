export default function command(vorpal: Vorpal) {
  return vorpal
    .command('config', 'Show the current Best Boy configuration')
    .action(async (args, callback) => {
      vorpal.log(vorpal.chalk.blue(JSON.stringify(vorpal.config, null, 2)));
    });
}
