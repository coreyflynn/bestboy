export default function command(vorpal: Vorpal) {
  return vorpal.command('credits').action(async (args, callback) => {
    vorpal.log(vorpal.chalk.white('Made with ❤️  in Boston'));
  });
}
