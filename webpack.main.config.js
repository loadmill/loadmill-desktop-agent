// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: {
    index: './src/index.ts',
    'loadmill-agent': './src/loadmill-agent.ts',
  },
  // Put your normal webpack config below here
  externals: {
    vm2: 'vm2',
  },
  module: {
    rules: require('./webpack.rules'),
  },
  node: {
    __dirname: true
  },
  optimization: {
    minimize: true
  },
  output: {
    filename:'[name].js',
    path: path.resolve(__dirname, '.webpack/main'),
  },
  // plugins: [
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: 'src/call-loadmill-agent.js' }
  //     ]
  //   }),
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: 'src/call-loadmill-agent.js' }
  //     ]
  //   }),
  // ],
  resolve: {
    alias: {
      type: 'type-component'
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    // preferRelative: true,
  },
};
