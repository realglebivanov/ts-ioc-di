const fs = require('fs');
const ImportLoader = require('./import-loader');

module.exports = class AliasProcessor {
  constructor(path, aliases) {
    this.path = path;
    this.content = fs.readFileSync(path).toString();
    this.imports = new ImportLoader(this.path, this.content, aliases).getImports();
  }

  load() {
    this.imports.each(statement => this.processImport(statement));
    return this;
  }

  processImport(statement) {
    this.content = this.content.replace(
      statement.getSource(),
      statement.getReplacement()
    );
  }

  write() {
    fs.writeFileSync(this.path, this.content);
  }
}
