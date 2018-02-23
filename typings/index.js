const path = require('path')
const webpackConfig = require('../webpack');
const TypingsProcessor = require('./typings-processor');

new TypingsProcessor('./build', webpackConfig)
  .processTypings()
  .cleanUp();
