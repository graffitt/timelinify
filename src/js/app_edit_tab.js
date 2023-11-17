const app_edit_tab = (app) => {
    app_edit_tab_show()
}

const app_edit_tab_show = () => {
    $('.tab').css('display', 'none')
    $('#app_edit_tab').css('display', 'flex')
}
const app_edit_tab_hide = () => {

}

// let icon_ext = [
//     'ico',
//     'png',
//     'jpg',
//     'jpeg',
//     'svg',
//     'bmp',
//     'webp',
//     'avif'
// ]
// $('#search_box').on('input change paste', (event) => {
//     let val = $(event.target).val()

//     if(val.startsWith('http') && icon_ext.indexOf(val.split('.').at(-1)) >= 0){
//         $('.app_icon').attr('src', val)
//     }
// })