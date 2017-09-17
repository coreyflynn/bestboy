const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const chalk = require('chalk');

module.exports = function fileWriter(
  featurePath,
  fileName,
  templatePath,
  data = {},
  overwrite = false,
) {
  const filePath = path.join(featurePath, fileName);
  if (fs.existsSync(filePath) && !overwrite) {
    return console.log(chalk.red(`${filePath} exists! I'm leaving it alone.`));
  }
  const template = fs.readFileSync(templatePath).toString();
  const compiledTemplate = Handlebars.compile(template);

  const contents = compiledTemplate(data);

  fs.writeFile(filePath, contents, err => {
    if (err) {
      return console.log(chalk.red(`Opps! I couldn't write your index.js file: ${err.message}.`));
    }

    console.log(chalk.green(`wrote ${filePath}`));
  });
};
