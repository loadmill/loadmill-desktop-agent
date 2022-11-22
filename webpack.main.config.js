module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
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
  resolve: {
    alias: { type: 'type-component' },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    // preferRelative: true,
  },
};
