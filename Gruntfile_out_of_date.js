'use strict';
module.exports = function (grunt) {
//http://gruntjs.com/sample-gruntfile
//http://g00glen00b.be/angular-grunt/
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
                src: [
                    "public_html/mountebank-UI/assets/js/jquery/jquery.min.js",
                    "public_html/mountebank-UI/assets/js/jquery-ui/jquery-ui.min.js",
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
                    "public_html/mountebank-UI/sections/import/import.ctl.js",
                    "public_html/mountebank-UI/sections/home/sorter.ctl.js",
                    "public_html/mountebank-UI/sections/json/json.ctl.js",
                    "public_html/mountebank-UI/sections/help/main_help.ctl.js",
                    "public_html/mountebank-UI/sections/help/help.ctl.js",
                    "public_html/mountebank-UI/components/headers/headers.drct.js"],
                // the location of the resulting JS file
                dest: 'build/public_html/<%= pkg.name %>/assets/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '<%= banner %>',
                mangle: false
            },
            dist: {
                files: {
                    'build/public_html/<%= pkg.name %>/assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/public_html/<%= pkg.name %>/assets/css/<%= pkg.name %>.min.css':
                            ['public_html/mountebank-UI/assets/css/app.css',
                                'public_html/mountebank-UI/assets/js/bootstrap/dist/css/bootstrap.min.css'
                            ]



                }
            }
        },
        copy: {
            html: {
                expand: true,
                cwd: 'public_html',
                src: ['mountebank-UI/components/headers/*.html',
                    'mountebank-UI/partials/*.html',
                    'mountebank-UI/sections/home/*.html',
                    'mountebank-UI/sections/import/*.html',
                    'mountebank-UI/sections/help/*.html',
                    'mountebank-UI/sections/json/*.html',
                    'mountebank-UI/sections/settings/*.html',
                    '*.ico'
                ],
                dest: 'build/public_html/',
                flatten: false
            },
            fonts: {
                expand: true,
                cwd: 'public_html/mounteBank-UI/assets/js/bootstrap/dist',
                flatten: true,
                src: 'fonts/*',
                dest: 'build/public_html/<%= pkg.name %>/assets/fonts/'

            },
            main: {
                expand: true,
                cwd: 'public_html',
                src: 'build.tpl.html',
                dest: 'build/public_html/',
                flatten: true,
                rename: function (dest, src)
                {
                    return dest + 'index.html';
                }
                /*  options: {
                 flatten: true,
                 process: function (content, srcpath)
                 {
                 console.log(srcpath);
                 return content;
                 }
                 }
                 */
            },
            readme: {
                expand: true,
                src: 'README*',
                dest: 'build/',
                flatten: true

            },
            js_beautify: {
                expand: true,
                cwd: 'public_html/mountebank-UI/assets/js/js-beautify/js/lib',
                src: "beautify.js",
                dest: 'build/public_html/mountebank-UI/assets/js/'

            }
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('run-all-tests', ['clean', 'karma:unit_tests']);
    grunt.registerTask('build', ['clean', 'copy', 'concat', 'uglify', 'cssmin'])
}
