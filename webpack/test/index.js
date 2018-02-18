module.exports = (paths) => ({
    watch: false,

    module: {
      rules: [{
          test: [/\.ts$/],
          loader: 'ts-loader',
          include: [paths.ts.specDir]
      }]
    }
});
