export default function command(vorpal: Vorpal) {
  return vorpal
    .command('config', 'Show the current Best Boy configuration')
    .action(async (args, callback) => {
      vorpal.log(
        vorpal.chalk.blue(
          `Using BestBoy config located at ${JSON.stringify(vorpal.configPath, null, 2)}`,
        ),
      );
      vorpal.log(vorpal.chalk.blue(JSON.stringify(vorpal.config, null, 2)));
    });
}
