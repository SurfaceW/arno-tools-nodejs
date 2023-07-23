const path = require('path');
const fs = require('fs');
const flattenDirectory = require('./flatten-directory');
const randomPicker = require('./random-picker');

/**
 * Flatten the directory structure by the first level of subdirectories.
 *
 * @param dir A directory path.
 */
function flattenByDateDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log('Directory does not exist:', dir);
    return;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (let file of files) {
    const filePath = path.join(dir, file.name);
    console.info('current processing filePath: ', filePath);
    if (file.isDirectory()) {
      // Step 1: flatten the directory
      // flattenDirectory(filePath);
      // Step 2: randomly pick 10% of the files
      randomPicker(filePath);
    }
  }
}


flattenByDateDir('D:\\record');
// flattenByDateDir(path.join(__dirname, './test/data'));
