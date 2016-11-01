var gulp = require('gulp'),
    jade = require('gulp-jade'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

var src = './src';
var paths = {
    src: src,
    dist: './dist',
    jade: src + '/jade/*.jade',
    sass: src + '/sass/**/*.scss',
    js: src + '/js/**/*.js',
    media: src + '/media/*',
    img: src + '/img/**/*',
    fonts: src + '/fonts/**/*',
    static: src + '/*.{txt,xml}'
};

// List tasks
gulp.task('default', ['help']);
gulp.task('help', $.taskListing.withFilters(null, 'default'));

// Build the app; clean, compile
gulp.task('build', buildTask);

// Local server for development; clean, compile, server + watching
gulp.task('serve', devServerTask);

// Clean the dist dir
gulp.task('clean', cleanTask);


//////////////////////////////////////

function devServerTask() {
    return runSequence('clean', 'compile', watchServer);

    ///////////

    function watchServer(){

        // Start the server
        browserSync.init({
            server: {
                baseDir: paths.dist,
                serveStaticOptions: {
                    // If there isn't an extension try .html
                    extensions: ['html']
                },
            }
        });

        // Start watching
        gulp.watch(paths.jade, ['compile_views']);
        gulp.watch(paths.js, ['compile_js']);
        gulp.watch(paths.sass, ['compile_sass']);
    }
}

function buildTask() {
    return runSequence('clean', 'compile');
}

function cleanTask() {
    return del([paths.dist]);
}

// Compile from src to dist
gulp.task('compile', ['compile_views', 'compile_sass', 'compile_js', 'compile_media', 'compile_static']);

// Compile jade templates
gulp.task('compile_views', function() {
    return gulp.src(paths.jade)
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.dist))
        .pipe(reload({
            stream: true
        }));
});


// Compile sass into CSS
gulp.task('compile_sass', function() {
    return gulp.src(paths.sass)
        .pipe($.sass())
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(reload({
            stream: true
        }));
});

// Compile js
gulp.task('compile_js', function() {
    return gulp.src(paths.js)
        .pipe($.concat('main.js'))
        .pipe(gulp.dest(paths.dist + '/js'))
        .pipe(reload({
            stream: true
        }));
});

// Compile media files
gulp.task('compile_media', ['compile_media:generic', 'compile_media:img', 'compile_media:fonts']);

gulp.task('compile_media:generic', function() {
    return gulp.src(paths.media)
        .pipe(gulp.dest(paths.dist + '/media'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('compile_media:img', function() {
    return gulp.src(paths.img)
        .pipe(gulp.dest(paths.dist + '/img'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('compile_media:fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dist + '/fonts'))
        .pipe(reload({
            stream: true
        }));
});

// Compile
gulp.task('compile_static', function() {
    return gulp.src(paths.static)
        .pipe(gulp.dest(paths.dist));
});
