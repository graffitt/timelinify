let LOCALE = {}
let _l = await locale()
let system_lang = _l.split('-')[0]

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
const localize = (string = '', ...objects) => {
    return interpolate_string(string, objects)
}

const set_locale = async (lang = 'en') => {
    const langs = [
        'en',
        'uk'
    ]
    const roots = [
        'https://tauri.localhost',
        'http://127.0.0.1:1430'
    ]
    const root = roots[1]
    //await ping('http://127.0.0.1:1430/')

    if(langs.indexOf(lang) < 0){
        lang = 'en'
    }

    let pre_LOCALE = await fetch(`${root}/locale/${lang}.json`)
    LOCALE = await pre_LOCALE.json()
}

await set_locale('en')
//-----------------------------------------------------------------------------

$('#search_box').prop('placeholder', LOCALE.search_placeholder)

console.warn(LOCALE)