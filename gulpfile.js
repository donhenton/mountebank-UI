/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var del = require('del');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-html-replace');
var server = require('gulp-server-livereload');
var gutil = require('gulp-util');


gulp.task('clean', function ( ) {

    del.sync(['public_html', 'reports']);

});


gulp.task('serve-cors', function (done) {
    gulp.src('./cors-explorer/public_html').on('error', gutil.log)
            .pipe(server(
                    {
                        livereload: false,
                        directoryListing: false,
                        open: true ,
                        defaultFile: 'cors-explorer.html',
                        port:9000
                        

                    }



            ));
});


/**
 The use of '_' in the scss file names apparently prevents them 
 from being picked up by the sass processor. if that wasn't the case, they
 would have their contents added to style.css
 
 */
gulp.task('minify-copy-js', function () {

    gulp.src([
        "src/mountebank-UI/assets/js/jquery/jquery.min.js",
        "src/mountebank-UI/assets/js/jquery-ui/jquery-ui.min.js",
        "src/mountebank-UI/assets/js/bootstrap/dist/js/bootstrap.min.js",
        "src/mountebank-UI/assets/js/angular/angular.js",
        "src/mountebank-UI/assets/js/angular-route/angular-route.js",
        "src/mountebank-UI/assets/js/angular-animate/angular-animate.js",
        "src/mountebank-UI/assets/js/angular-local-storage/dist/angular-local-storage.js",
        "src/mountebank-UI/assets/js/angular-ui-sortable/sortable.js",
        "src/mountebank-UI/assets/js/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "src/mountebank-UI/assets/js/angular-messages/angular-messages.js",
        "src/mountebank-UI/app/app.js",
        "src/mountebank-UI/app/app.routes.js",
        "src/mountebank-UI/app/app.constants.js",
        "src/mountebank-UI/app/app.services.js",
        "src/mountebank-UI/services/mountebank.fct.js",
        "src/mountebank-UI/services/imposters.fct.js",
        "src/mountebank-UI/sections/settings/settings.ctl.js",
        "src/mountebank-UI/sections/home/homePage.ctl.js",
        "src/mountebank-UI/sections/import/import.ctl.js",
        "src/mountebank-UI/sections/home/sorter.ctl.js",
        "src/mountebank-UI/sections/json/json.ctl.js",
        "src/mountebank-UI/sections/help/main_help.ctl.js",
        "src/mountebank-UI/sections/help/help.ctl.js",
        "src/mountebank-UI/components/headers/headers.drct.js"]
            )

            .pipe(concat('mountebank-UI.min.js',
                    {newLine: '\n\/*------------- end concat file--------------------*/\n;'}))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest('./public_html/mountebank-UI/assets/js/'));
    
    
    
     gulp.src(
             'src/mountebank-UI/assets/js/js-beautify/beautify.js' 
    
            ).pipe(gulp.dest('./public_html/mountebank-UI/assets/js/'));
  
});

gulp.task('copy-resources', function () {



    gulp.src(
            ['!src/public_html*.html', '!src/index.html',
                'src/mountebank-UI/**/*.html','!src/mountebank-UI/assets/**/*' 
            ]

 
            ).pipe(gulp.dest('./public_html/mountebank-UI/'));
    
     gulp.src(
            'src/*.ico' 

 
            ).pipe(gulp.dest('./public_html/'));
    
                
    
    
    
    gulp.src(
            [
                'README.md'
            ]


            ).pipe(gulp.dest('./public_html'));
    
    
    
    
    gulp.src(
            [
                'src/mounteBank-UI/assets/js/bootstrap/dist/fonts/*'
            ]


            ).pipe(gulp.dest('./public_html/mountebank-UI/assets/fonts/'));

 

    gulp.src(['src/mountebank-UI/assets/css/app.css',
        'src/mountebank-UI/assets/js/bootstrap/dist/css/bootstrap.min.css'
    ])
            .pipe(concat('mountebank-UI.min.css',
                    {newLine: '\n\/*------------- end concat file--------------------*/\n;'}))
            .pipe(minifyCss( ))
            .pipe(gulp.dest('public_html/mountebank-UI/assets/css/'));



});

gulp.task('prepare-index-html', function () {
    return gulp.src('src/index.html')
            .pipe(
            replace({
                swap_css: 'mountebank-UI/assets/css/mountebank-UI.min.css',
                swap_js: ['mountebank-UI/assets/js/beautify.js','mountebank-UI/assets/js/mountebank-UI.min.js']
            }))
            .pipe(gulp.dest('public_html/'));


});

gulp.task('serve-public', function (done) {
    gulp.src('public_html').on('error', gutil.log)
            .pipe(server(
                    {
                        livereload: false,
                        directoryListing: false,
                        open: true ,
                        defaultFile: 'index.html'
                        

                    }



            ));
});

gulp.task('dev', function (done) {
    gulp.src('src').on('error', gutil.log)
            .pipe(server(
                    {
                        livereload: true,
                        directoryListing: false,
                        open: true ,
                        defaultFile: 'index.html'
                        

                    }



            ));
});


gulp.task('build', ['clean', 'minify-copy-js', 'copy-resources','prepare-index-html']);