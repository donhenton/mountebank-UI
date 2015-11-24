'use strict';
module.exports = function (grunt) {
//http://gruntjs.com/sample-gruntfile
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        clean: {
            reports: ['reports', 'build']
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ["public_html/mountebank-UI/assets/js/jquery/jquery.min.js",
                    "public_html/mountebank-UI/assets/js/bootstrap/dist/js/bootstrap.min.js",
                    "public_html/mountebank-UI/assets/js/angular/angular.js",
                    "public_html/mountebank-UI/assets/js/angular-route/angular-route.js",
                    "public_html/mountebank-UI/assets/js/angular-animate/angular-animate.js",
                    "public_html/mountebank-UI/assets/js/angular-local-storage/dist/angular-local-storage.js",
                    "public_html/mountebank-UI/assets/js/angular-ui-sortable/sortable.js",
                    "public_html/mountebank-UI/assets/js/angular-bootstrap/ui-bootstrap-tpls.min.js", 
                    "public_html/mountebank-UI/assets/js/angular-messages/angular-messages.js",
                    "public_html/mountebank-UI/app/app.js",
                    "public_html/mountebank-UI/app/app.routes.js",
                    "public_html/mountebank-UI/app/app.constants.js",
                    "public_html/mountebank-UI/app/app.services.js",
                    "public_html/mountebank-UI/services/mountebank.fct.js",
                    "public_html/mountebank-UI/services/imposters.fct.js",
                    "public_html/mountebank-UI/sections/settings/settings.ctl.js",
                    "public_html/mountebank-UI/sections/home/homePage.ctl.js",
                    "public_html/mountebank-UI/sections/json/json.ctl.js",
                    "public_html/mountebank-UI/sections/help/help.ctl.js",
                    "public_html/mountebank-UI/components/headers/headers.drct.js"],
                // the location of the resulting JS file
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            build: {
                cwd: 'public_html',
                src: ['components/**,partials,sections,services'],
                dest: 'build',
                expand: true
            },
        },
        karma: {
            unit_tests: {
                configFile: 'test/conf/unit-tests.conf.js',
                singleRun: true
            }

        }



    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('run-all-tests', ['karma:unit_tests']);
    grunt.registerTask('build', ['clean','copy', 'concat', 'uglify'])
}
