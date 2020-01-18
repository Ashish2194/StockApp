const dotenv = require('dotenv');
const path = require('path');

const package = require('../package.json');

// Project name as defined in `package.json` in MACRO_CASE
const projectName = package.name.replace(/[-_\s]/g, '_').toUpperCase();

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const outputDir = path.resolve(rootDir, 'dist');
const sourceDir = path.resolve(rootDir, 'src');

const htmlTemplatePath = path.resolve(publicDir, 'index.html');
const entryPath = path.resolve(sourceDir, 'index.js');

function _getDotEnvConfig(buildTarget) {
  let debug, filePath;
  switch (buildTarget) {
    case 'production':
    case 'staging':
      debug = false;
      filePath = path.resolve(rootDir, `.env.${buildTarget}`);
      break;
    default:
      debug = true;
      filePath = path.resolve(rootDir, '.env');
  }

  return { debug, path: filePath };
}

// We only inject variable names that start with
// `${MACRO_CASED_PROJECT_NAME}_APP_`
function _isValidEnvVariable(varName) {
  return varName.startsWith(`${projectName}_APP_`);
}

function getEnvJson(buildTarget) {
  // Loads env variables to process.env
  dotenv.config(_getDotEnvConfig(buildTarget));

  const json = { NODE_ENV: JSON.stringify(process.env.NODE_ENV) };
  Object.keys(process.env).forEach(key => {
    if (_isValidEnvVariable(key)) {
      json[key] = JSON.stringify(process.env[key]);
    }
  });

  return json;
}

module.exports = {
  entryPath,
  getEnvJson,
  htmlTemplatePath,
  outputDir,
  publicDir,
  rootDir,
  sourceDir
};