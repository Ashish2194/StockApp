const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack/common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}, argv) => {
  // By default if no mode is specified webpack assumes as production.
  // But we are reversing that behavior
  const mode = argv.mode || 'development';
  process.env.NODE_ENV = mode;
  console.log(`Webpack bundling for ${mode}...`);

  const envConfig = require(`./webpack/${mode}.config.js`);

  return webpackMerge(commonConfig(env, mode), envConfig(env, mode));
}