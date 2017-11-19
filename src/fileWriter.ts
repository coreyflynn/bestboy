import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as prettier from 'prettier';

const prettierConfig: any = {
  printWidth: 100,
  parser: 'flow',
  singleQuote: true,
  trailingComma: 'all',
};

export default function fileWriter(
  featurePath: string,
  fileName: string,
  templatePath: string,
  data = {},
  overwrite = false,
  append = false,
): FileWriterOutput {
  const filePath = path.join(featurePath, fileName);
  if (fs.existsSync(filePath) && !overwrite) {
    return { message: `${filePath} exists! I'm leaving it alone.`, color: 'red' };
  }
  const template = fs.readFileSync(templatePath).toString();
  const compiledTemplate = Handlebars.compile(template);

  const contents = prettier.format(compiledTemplate(data), prettierConfig);

  if (append) {
    const stream = fs.createWriteStream(filePath, { flags: 'a' });
    stream.write(contents);
    stream.end();
    return { message: `Added to ${filePath}`, color: 'green' };
  }

  fs.writeFile(filePath, contents, err => {
    if (err) {
      return { message: `Opps! I couldn't write your file: ${err.message}.`, color: 'red' };
    }
  });
  return { message: `wrote ${filePath}`, color: 'green' };
}
