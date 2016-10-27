var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({
    lazy: true
});

var src = './src';
var paths = {
    src: src,
    dist: './dist',
    html: [
        '!' + src + '/_*.html', // underscored templates don't get built
        src + '/*.html',
    ],
    sass: src + '/sass/**/*.scss',
    js: [
        src + '/js/jquery.min.js',
        src + '/js/jquery.dropotron.min.js',
        src + '/js/jquery.scrollgress.min.js',
        src + '/js/skel.min.js',
        src + '/js/skel-layers.min.js',
        src + '/js/init.js',
    ],
    media: src + '/media/*',
    img: src + '/img/**/*',
    fonts: src + '/fonts/**/*',
    static: src + '/*.{txt,xml}',
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
        gulp.watch(paths.js, ['compile_js']);
        gulp.watch(paths.sass, ['compile_sass']);
        gulp.watch(paths.html, ['compile_templates']);
    }
}

function buildTask() {
    return runSequence('clean', 'compile');
}

function cleanTask() {
    return del([paths.dist]);
}

// Compile from src to dist
gulp.task('compile', ['compile_templates', 'compile_sass', 'compile_js', 'compile_media', 'compile_static']);

// Compile swig templates
gulp.task('compile_templates', function() {
    return gulp.src(paths.html)
        .pipe($.swig({
            defaults: {
                cache: false
            }
        }))
        .pipe(gulp.dest(paths.dist))
        .on("end", reload);
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
