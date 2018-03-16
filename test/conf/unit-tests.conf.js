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
            "public_html/mountebank-UI/assets/js/js-beautify/js/lib/beautify.js",
            "public_html/mountebank-UI/assets/js/jquery/jquery.min.js",
            "public_html/mountebank-UI/assets/js/jquery-ui/jquery-ui.min.js",
            "public_html/mountebank-UI/assets/js/bootstrap/dist/js/bootstrap.min.js",
            "public_html/mountebank-UI/assets/js/angular/angular.js",
            'public_html/mountebank-UI/assets/js/angular-mocks/angular-mocks.js',
            "public_html/mountebank-UI/assets/js/angular-route/angular-route.js",
            "public_html/mountebank-UI/assets/js/angular-animate/angular-animate.js",
            "public_html/mountebank-UI/assets/js/angular-local-storage/dist/angular-local-storage.js",
            "public_html/mountebank-UI/assets/js/angular-ui-sortable/sortable.js",
            "public_html/mountebank-UI/assets/js/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "public_html/mountebank-UI/assets/js/angular-messages/angular-messages.js",
            "test/data/imposter_data.js", "test/data/levenshtein.js",
            
            "public_html/mountebank-UI/app/app.js",
            "public_html/mountebank-UI/app/app.routes.js",
            "public_html/mountebank-UI/app/app.constants.js",
            "public_html/mountebank-UI/app/app.services.js",
            "public_html/mountebank-UI/services/mountebank.fct.js",
            "public_html/mountebank-UI/services/imposters.fct.js",
            "public_html/mountebank-UI/sections/settings/settings.ctl.js",
            "public_html/mountebank-UI/sections/home/homePage.ctl.js",
            "public_html/mountebank-UI/sections/import/import.ctl.js",
            "public_html/mountebank-UI/sections/home/sorter.ctl.js",
            "public_html/mountebank-UI/sections/json/json.ctl.js",
            "public_html/mountebank-UI/sections/help/help.ctl.js",
            "public_html/mountebank-UI/sections/help/main_help.ctl.js",
            "public_html/mountebank-UI/components/headers/headers.drct.js",
            '**/*.tpl.html',
            'test/unit_tests/**/*_tests.js'

        ],
        htmlReporter: {
            outputFile: 'reports/html_out/karma_unit_tests.html'

        },
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public_html/mountebank-UI/components/**/*.js': ['coverage'],
            'public_html/mountebank-UI/sections/**/*.js': ['coverage'],
            'public_html/mountebank-UI/services/**/*.js': ['coverage'],
            'public_html/mountebank-UI/app/**/*.js': ['coverage'],
            '**/*.tpl.html': ['ng-html2js']


        },
        ngHtml2JsPreprocessor: {
            moduleName: 'templates'


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
       // browsers: ['PhantomJS'],
          browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};

