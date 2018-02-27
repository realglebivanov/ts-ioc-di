const { join } = require('path');

const webpackMerge = require('webpack-merge');
const paths = require('./paths.js');
const Env = require('./env.js');

const environment = new Env();

const commonConfigPath = join(paths.configDir, 'common');
const environmentConfigPath = join(paths.configDir, environment.getName());

const commonConfig = require(commonConfigPath)(paths, environment);
const environmentConfig = require(environmentConfigPath)(paths, environment);

module.exports = webpackMerge(commonConfig, environmentConfig);
