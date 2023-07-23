const fs = require('fs');
const path = require('path');

/**
 * This function accepts a directory path as an input and returns an object with directory details
 * @param {string} dirPath - The directory path
 * @returns {object} - An object containing the directory details
 */
function getDirectoryDetails(dirPath) {
  const files = fs.readdirSync(dirPath);

  return {
    path: dirPath,
    totalFiles: files.length,
    files: files,
  };
}

/**
 * This function selects 10% of the total files evenly distributed and removes the rest of the files
 * @param {object} dirDetails - The directory details
 */
function removeFiles(dirDetails) {
  const { totalFiles, files, path: dirPath } = dirDetails;
  const filesToKeepCount = Math.ceil(totalFiles * 0.1);
  const keepEvery = Math.floor(totalFiles / filesToKeepCount);

  console.log('Now keep files from:', dirDetails.path);

  files.forEach((file, index) => {
    if (index % keepEvery !== 0) {
      fs.unlinkSync(path.join(dirPath, file));
    }
  });
}

// Entry point
function main(dir) {
  const dirPath = dir || process.argv[2]; // Get directory path from command line argument
  const dirDetails = getDirectoryDetails(dirPath);

  removeFiles(dirDetails);
}

// Run the main function
module.exports = main;
