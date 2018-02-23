const fs = require('fs');
const { relative, parse } = require('path');

module.exports = class AliasProcessor {
  constructor(path, aliases) {
    this.path = path;
    this.content = fs.readFileSync(path).toString();
    this.aliases = aliases;
  }

  load() {
    for (const alias in this.aliases) {
      this.content = this.content.replace(this.makeRegexp(alias), this.relativePath(alias));
    }
    return this;
  }

  makeRegexp(alias) {
    return new RegExp(alias, 'g');
  }

  relativePath(alias) {
    return relative(parse(this.path).dir, this.aliases[alias]);
  }

  write() {
    fs.writeFileSync(this.path, this.content);
  }
}
