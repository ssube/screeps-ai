const gulp = require('gulp');
const webpack = require('webpack-stream');
const gulpScreeps = require('gulp-screeps');
const insert = require('gulp-insert');
const eslint = require('gulp-eslint');

const paths = {
    src: 'src/**/*.js'
};

const commitTask = (credentialFile) => {
    return gulp.src('src/main.js')
        .pipe(webpack({ output: { filename: "main.js" } }))
        .pipe(insert.prepend("module.exports = "))
        .pipe(require(credentialFile)));
};

gulp.task('default', ['lint', 'commit-test']);

gulp.task('commit-test', () => commitTask('./credentials-test.json'));
gulp.task('commit-prod', () => commitTask('./credentials.json'));

gulp.task('lint', () =>
    gulp.src(paths.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError()));

gulp.task('watch', () => gulp.watch(paths.src, ['default']));
