const lazy = require('lazy.js');
const Import = require('./import');

module.exports = class ImportLoader {
  constructor(path, content, aliases) {
    this.path = path;
    this.content = content;
    this.aliases = aliases;
    this.regexp = /(import\s*{.+}\s*from\s*['"](.+)['"];?)/;
  }

  getImports() {
    return lazy(this.content).split("\n")
      .map(line => line.match(this.regexp))
      .takeWhile(match => match !== null)
      .map(match => new Import(this.path, this.aliases, match));
  }
}
