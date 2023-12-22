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

const set_locale = async (lang = 'en') => {
    const prefix = 'https://tauri.localhost'//'http://127.0.0.1:1430'
    const langs = [
        'en',
        'uk'
    ]

    if(langs.indexOf(lang) < 0){
        lang = 'en'
    }

    let pre_LOCALE = await fetch(`${prefix}/locale/${lang}.json`)
    LOCALE = pre_LOCALE.data
}
await set_locale('uk')
//-----------------------------------------------------------------------------

$('#search_box').prop('placeholder', LOCALE.search_placeholder)

// const response = await fetch('http://127.0.0.1:1430/locale/uk.json')
// console.warn(response.data)
console.warn(LOCALE)