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

    del.sync(['build', 'reports']);

});


/**
 The use of '_' in the scss file names apparently prevents them 
 from being picked up by the sass processor. if that wasn't the case, they
 would have their contents added to style.css
 
 */
gulp.task('minify-copy-js', function () {

    gulp.src([
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
        "public_html/mountebank-UI/components/headers/headers.drct.js"]
            )

            .pipe(concat('mountebank-UI.min.js',
                    {newLine: '\n\/*------------- end concat file--------------------*/\n;'}))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest('./build/public_html/mountebank-UI/assets/js/'));
    
    
    
     gulp.src(
             'public_html/mountebank-UI/assets/js/js-beautify/js/lib/beautify.js' 
    
            ).pipe(gulp.dest('./build/public_html/mountebank-UI/assets/js/'));
  
});

gulp.task('copy-resources', function () {



    gulp.src(
            ['!public_html/build*.html', '!public_html/index.html',
                'public_html/mountebank-UI/**/*.html','!public_html/mountebank-UI/assets/**/*' 
            ]

 
            ).pipe(gulp.dest('./build/public_html/mountebank-UI/'));
    
     gulp.src(
            'public_html/*.ico' 

 
            ).pipe(gulp.dest('./build/public_html/'));
    
                
    
    
    
    gulp.src(
            [
                'README.md'
            ]


            ).pipe(gulp.dest('./build'));
    
    
    
    
    gulp.src(
            [
                'public_html/mounteBank-UI/assets/js/bootstrap/dist/fonts/*'
            ]


            ).pipe(gulp.dest('./build/public_html/mountebank-UI/assets/fonts/'));

 

    gulp.src(['public_html/mountebank-UI/assets/css/app.css',
        'public_html/mountebank-UI/assets/js/bootstrap/dist/css/bootstrap.min.css'
    ])
            .pipe(concat('mountebank-UI.min.css',
                    {newLine: '\n\/*------------- end concat file--------------------*/\n;'}))
            .pipe(minifyCss( ))
            .pipe(gulp.dest('build/public_html/mountebank-UI/assets/css/'));



});

gulp.task('prepare-index-html', function () {
    return gulp.src('public_html/index.html')
            .pipe(
            replace({
                swap_css: 'mountebank-UI/assets/css/mountebank-UI.min.css',
                swap_js: 'mountebank-UI/assets/js/mountebank-UI.min.js'
            }))
            .pipe(gulp.dest('build/public_html/'));


});

gulp.task('serve', function (done) {
    gulp.src('build/public_html').on('error', gutil.log)
            .pipe(server(
                    {
                        livereload: false,
                        directoryListing: false,
                        open: true ,
                        defaultFile: 'index.html'
                        

                    }



            ));
});

gulp.task('build', ['clean', 'minify-copy-js', 'copy-resources','prepare-index-html']);