const { LoaderOptionsPlugin } = require('webpack');

module.exports = (paths) => ({
    context: paths.ts.srcDir,
    entry: { app: './index' },

    output: {
        path: paths.ts.buildDir,
        publicPath: paths.ts.buildPath,
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.js'],
        alias: { '@': paths.ts.srcDir }
    },

    module: {
      rules: [{
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          exclude: [paths.ts.srcDir]
      }, {
          test: [/\.ts$/, /\.js$/],
          loader: 'ts-loader'
      }]
    },

    plugins: [
      new LoaderOptionsPlugin({
          options: {
            tslint: {emitErrors: true, failOnHint: true, typeCheck: true, project: true}
          }
      })
    ]
});
