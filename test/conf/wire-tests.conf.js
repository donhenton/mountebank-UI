module.exports = function (config) {
    config.set({
// base path that will be used to resolve all patterns (eg. files, exclude) to the root of the netbeans app
        basePath: '../..',
        autoWatch: false,
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            "public_html/mountebank-UI/assets/js/jquery/jquery.min.js",
            "public_html/mountebank-UI/assets/js/json3/lib/json3.js",
            "test/wire_tests/data/imposter_data.js" ,
            'test/wire_tests/tests/**/*_tests.js'

        ],
        htmlReporter: {
            outputFile: 'reports/html_out/karma_wire_tests.html'

        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'dots', 'junit'],
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        //  browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};

