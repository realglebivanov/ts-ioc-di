const { relative, parse } = require('path');

module.exports = class Import {
  constructor(path, aliases, match) {
    this.path = path;
    this.aliases = aliases;
    this.match = match;
  }

  getSource() {
    return this.match[1];
  }

  getReplacement() {
    return this.getSource().replace(this.match[2], this.getPathReplacement());
  }

  getPathReplacement() {
    return Object.keys(this.aliases).reduce((result, alias) => {
      return result.replace(alias, this.getRelativePath(alias));
    }, this.match[2]);
  }

  getRelativePath(alias) {
    return relative(parse(this.path).dir, this.aliases[alias]);
  }
}
