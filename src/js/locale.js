let LOCALE = {}

/**
 * interpolate string
 * [src](https://stackoverflow.com/questions/3304014/how-to-interpolate-variables-in-strings-in-javascript-without-concatenation/42100645#42100645)
 * @param {string} string object for interpolation
 * @param  {...any} objects set of subjects to interpolate
 * @returns {string} result of interpolation
 * @example
 * // returns 'Lorem ipsum dolor sit amet'
 * interpolate_string('Lorem {0} dolor {1} amet', 'ipsum', 'sit')
 */
const interpolate_string = (string = '', ...objects) => {
    return string.replace(new RegExp('\{([^\{]+)\}', 'g'), (_unused, index) => {
        return objects[parseInt(index)] ?? ''
    })
}
const locale = (string = '', ...objects) => {
    return interpolate_string(string, objects)
}

const set_locale = (lang = 'en') => {
    resolveResource(`../src/locale/${lang}.json`).then(path => {
        readTextFile(path).then(locale_data => {
            LOCALE = JSON.parse(locale_data)
        })
    })
}
set_locale('en')
//-----------------------------------------------------------------------------

$('#search_box').prop('placeholder', LOCALE.search_placeholder)