const webpackConfig = require('./webpack');

module.exports = function (config) {
    config.set({
        colors: true,
        singleRun: false,

        webpack: webpackConfig,
        webpackMiddleware: {
            logLevel: 'error',
            stats: 'errors-only'
        },

        frameworks: ['jasmine'],

        files: [
            { pattern: 'src/ts/**/*.ts', watched: false },
            { pattern: 'spec/ts/**/*.ts', watched: false }
        ],

        preprocessors: {
            'src/**/*.ts': ['webpack', 'coverage'],
            'spec/**/*.ts': ['webpack']
        },

        reporters: ['progress', 'coverage'],

        browsers: ['PhantomJS']
    });
};
