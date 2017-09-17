const mkdirp = require('mkdirp');
const fs = require('fs');

function createFolderIfNeeded(path) {
  if (fs.existsSync(path)) return;
  mkdirp.sync(path);
}

module.exports = {
  createFolderIfNeeded,
};
