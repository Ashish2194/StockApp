const { DefinePlugin } = require('webpack');
const path = require('path');

// Webpack plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWepackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { rootDir } = require('./utils');

const {
  entryPath,
  getEnvJson,
  htmlTemplatePath,
  outputDir,
  publicDir,
  sourceDir,
} = require('./utils');

module.exports = env => ({
  // Configure's our app entry points
  entry: {
    main: entryPath,
  },

  // Configure's loaders to let webpact know how different extension should be
  // loaded when bundling
  module: {
    rules: [
      // Configure's babel loader for transpiling javascript, eslint loader
      // for linting javascript, stylelint loader for css linting
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'stylelint-custom-processor-loader',
            options: {
              configPath: path.resolve(rootDir, '.stylelintrc.js'),
            },
          },
          'eslint-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },

      // Configure's loaders for images
      {
        test: /.(png|jpg|jpeg|svg|gif)/,
        use: 'file-loader'
      },
    ]
  },

  // Configure's destination for the bundled code
  output: {
    path: outputDir,
  },

  // Configure's additions plugins to be used by webpack
  // Order of plugins is important
  plugins: [
    // Removes all the contents of output folder(but not the folder itself)
    // before every webpack build
    new CleanWebpackPlugin(),

    // Copies all contents of public folder as it is excluding index.html file
    new CopyWepackPlugin([
      {
        from: publicDir,
        to: outputDir,
        ignore: ['index.html']
      }
    ]),

    // Injects target specific enviroment variables
    new DefinePlugin({
      'process.env': getEnvJson(env.target)
    }),

    // Uses `public/index.html` and creates a `index.html` file for the app
    // by injecting the generated bundles javascript files
    new HtmlWebpackPlugin({
      template: htmlTemplatePath
    }),
  ],

  // Configure's custom behavior for how modules are resolved by webpack
  resolve: {
    modules: [sourceDir, 'node_modules']
  }
});