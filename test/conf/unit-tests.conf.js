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
             
             
             
             
            'public_html/angular-sample/assets/js/jquery/jquery.min.js',
            'public_html/angular-sample/assets/js/bootstrap/dist/js/bootstrap.min.js',
            'public_html/angular-sample/assets/js/angular/angular.min.js',
            'public_html/angular-sample/assets/js/angular-route/angular-route.min.js',
            'public_html/angular-sample/assets/js/angular-mocks/angular-mocks.js',
            'public_html/angular-sample/sections/homePages.js',
            'public_html/angular-sample/app/app.js',
            
   
            '**/*.tpl.html',
            'test/unit_tests/**/*_tests.js'

        ],
        htmlReporter: {
            outputFile: 'reports/html_out/karma_unit_tests.html'

        },
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public_html/angular-sample/components/*.js': ['coverage'],
            'public_html/angular-sample/sections/*.js': ['coverage'],
            'public_html/angular-sample/services/*.js': ['coverage'],
            'public_html/angular-sample/app/*.js': ['coverage'],
            '**/*.tpl.html': ['ng-html2js']


        },
        ngHtml2JsPreprocessor: {
            
             moduleName: 'myTemplates'
            
            
        },
        junitReporter: {
            outputFile: 'reports/junit/karma-test-results.xml',
            suite: 'Unit Tests'
        },
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'reports/unit_test_html_coverage/',
                    subdir: 'unit_test_chrome'
                },
                {
                    type: 'cobertura',
                    dir: 'reports/unit_test_coverage/',
                    subdir: 'chrome',
                    file: 'karma-chrome.xml'
                }, {
                    type: 'json',
                    dir: 'reports/unit_test_coverage/',
                    subdir: 'json',
                    file: 'karma-coverage.json'
                }]
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'html', 'dots', 'junit'],
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

