const glob = require('glob');
const { join } = require('path');
const deleteEmpty = require('delete-empty');
const AliasLoader = require('./alias-loader');
const AliasProcessor = require('./alias-processor');

module.exports = class TypingsProcessor {
  constructor(rootPath, webpackConfig) {
    this.rootPath = rootPath;
    this.paths = glob.sync(join(rootPath, '**', '*.d.ts'), { absolute: true });
    this.aliases = new AliasLoader(webpackConfig).getAliases();
  }

  processTypings() {
    this.paths.map(path => new AliasProcessor(path, this.aliases))
      .map(processor => processor.load())
      .forEach(processor => processor.write());
    return this;
  }

  cleanUp() {
    deleteEmpty.sync(this.rootPath);
  }
}
