const path = require('path')
const webpackConfig = require('../webpack');
const TypingsProcessor = require('./typings-processor');

const processor = new TypingsProcessor(path.resolve('./build'), webpackConfig);

processor.processTypings();
processor.cleanUp();
