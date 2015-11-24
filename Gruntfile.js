'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        clean: {
            reports: ['reports','build']
        },
        copy: {
            build: {
                cwd: 'public_html',
                src: ['**'],
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
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('run-all-tests', ['karma:unit_tests']);
    grunt.registerTask('build', ['clean','copy'])
}
