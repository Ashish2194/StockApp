const webpack = require('webpack');

const { outputDir } = require('./utils');

module.exports = env => ({
  // Configures how source maps should be created
  devtool: 'eval-source-map',

  // Configure's webpack development server
  devServer: {
    contentBase: outputDir,
    historyApiFallback: true,
    port: 8000,
  },

  // Configure's destination for the bundled code
  output: {
    filename: './js/[name].js'
  },

  // Configure's additions plugins to be used by webpack
  // Order of plugins is important
  plugins: [
    // Plugin that enables hot module replacement(HMR) or hot reload.
    // Your changes take effect without a complete page reload
    new webpack.HotModuleReplacementPlugin()
  ]
});