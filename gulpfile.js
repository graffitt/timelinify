const path = {
    src: {
        html: './src/index.html',
        js: './src/js/_bundle.js',
        js_libs: './src/js/libs/_libs.js',
        stylus: './src/stylus/_bundle.styl',
        img: ['./src/img/*.+(svg|png)', '!./src/img/#*.*'], //except #
        fonts: './src/fonts/*.woff2',
        locale: './src/locale/*.json'//,
        // sounds: ['./src/sounds/**/*', '!./src/sounds/**/#*'],
        // themes: './src/themes/*.styl'
    },
    release: {
        html: './release/',
        js: './release/js/',
        js_libs: './release/js/',
        css: './release/css/',
        img: './release/img/',
        fonts: './release/fonts/',
        locale: './release/locale/'//,
        // sounds: './release/sounds/',
        // themes: './release/themes/'
    },
    clean: './release',
    build_file: './build_file.json'
}
const {series, src, dest} = require('gulp')
const include = require('gulp-include')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const gulp_stylus = require('gulp-stylus')
const clean_css = require('gulp-clean-css')
const del = require('del')
const gulp_if = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const json_minify = require('gulp-json-minify')
//-------------------------------------------------------------------

const use_sourcemaps = false

const uglify_html = false
const uglify_js = false
const uglify_css = true

const clean_release = () => {
    return del(path.clean)
}
const html = () => {
    return src(path.src.html)
        .pipe(include())
        // .pipe(stripComments())
        .pipe(uglify_html ? htmlmin({
            collapseWhitespace: true
        }) : htmlmin())
        .pipe(dest(path.release.html))
}
const js = () => {
    return src(path.src.js)
        .pipe(gulp_if(use_sourcemaps, sourcemaps.init()))
        .pipe(include())
        .pipe(uglify())
        .pipe(gulp_if(use_sourcemaps, sourcemaps.write('./')))
        .pipe(dest(path.release.js))
}
// const js_libs = () => {
//     return src(path.src.js_libs)
//         .pipe(gulp_if(use_sourcemaps, sourcemaps.init()))
//         .pipe(include())
//         // .pipe(uglify())
//         .pipe(gulp_if(use_sourcemaps, sourcemaps.write('./')))
//         .pipe(dest(path.release.js_libs))
// }
const stylus = () => {
    return src(path.src.stylus)
        .pipe(gulp_if(use_sourcemaps, sourcemaps.init()))
        .pipe(include())
        .pipe(gulp_stylus({
            compress: uglify_css
        }))
        // .pipe(gulpPrefixer({
        //     cascade: false
        // }))
        /*.pipe(purge({
            trim: true,
            shorten: false
        }))*/
        .pipe(gulp_if(use_sourcemaps, sourcemaps.write('./')))
        .pipe(dest(path.release.css))
}
const img = () => {
    return src(path.src.img)
        .pipe(dest(path.release.img))
}
const fonts = () => {
    return src(path.src.fonts)
        .pipe(dest(path.release.fonts))
}
const locale = () => {
    return src(path.src.locale)
        .pipe(json_minify())
        .pipe(dest(path.release.locale))
}

const release = series(clean_release, html, js, stylus, img, fonts, locale)

exports.release = release
exports.html = html
exports.js = js
exports.stylus = stylus
exports.img = img
exports.locale = locale