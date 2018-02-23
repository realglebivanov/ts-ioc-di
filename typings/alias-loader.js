module.exports = class AliasLoader {
  constructor(webpackConfig) {
    this.aliases = webpackConfig.resolve.alias;
    this.sourcePath = webpackConfig.context;
    this.outputPath = webpackConfig.output.path
  }

  getAliases() {
    return Object.keys(this.aliases)
      .map(alias => ({[alias]: this.generateOutputPath(alias)}))
      .reduce((acc, curr) => Object.assign(acc, curr), {})
  }

  generateOutputPath(alias) {
    return this.aliases[alias].replace(this.sourcePath, this.outputPath)
  }
}
