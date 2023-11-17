// f12 devtools
// ctrl q quit

let ctrl_codes = [
    'KeyR',
    'KeyU',
    'KeyP',
    'KeyG'
]
let ctrl_shift_codes = [
    'KeyI',
    'KeyS'
]
let f_codes = [
    'F3',
    'F7',
    'F10'
]

document.body.addEventListener('keydown', event => {
    if(event.ctrlKey && ctrl_codes.indexOf(event.code) !== -1){
        event.stopPropagation()
        event.preventDefault()
    }

    if(event.ctrlKey && event.shiftKey && ctrl_shift_codes.indexOf(event.code) !== -1){
        event.stopPropagation()
        event.preventDefault()
    }

    if(f_codes.indexOf(event.code) !== -1){
        event.stopPropagation()
        event.preventDefault()
    }
})