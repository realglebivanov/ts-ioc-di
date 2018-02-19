const WebpackMochaPlugin = require('webpack-mocha-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (paths) => ({
    watch: false,
    target: 'node',
    devtool: 'inline-source-map',

    externals: [nodeExternals()],
    context: paths.ts.specDir,
    entry: { index: './index' },

    output: {
      path: paths.root('.tmp/test'),
      filename: '[name].bundle.js'
    },

    module: {
      rules: [{
          test: [/\.ts$/],
          loader: 'ts-loader',
          include: [paths.ts.specDir, paths.ts.srcDir]
      }]
    },

    plugins: [
        new WebpackMochaPlugin({
            codeCoverage: false
        })
    ]
});
