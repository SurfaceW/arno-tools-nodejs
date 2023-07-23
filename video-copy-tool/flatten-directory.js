const fs = require('fs');
const path = require('path');

/**
 * Flatten the directory structure by the first level of subdirectories.
 *
 * @param dir A directory path.
 */
function flattenDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log('Directory does not exist:', dir);
    return;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (let file of files) {
    let filePath = path.join(dir, file.name);

    // If it is a directory, move its files up.
    if (file.isDirectory()) {
      let subFiles = fs.readdirSync(filePath);

      console.log('Moving files from', filePath, 'to', dir);

      for (let subFile of subFiles) {
        let oldPath = path.join(filePath, subFile);
        let newPath = path.join(dir, file.name + '-' + subFile);

        // Rename the file to include the subdirectory name.
        fs.renameSync(oldPath, newPath);
      }

      // Remove the now-empty subdirectory.
      fs.rmdirSync(filePath);
    }
  }
}

module.exports = flattenDirectory;
