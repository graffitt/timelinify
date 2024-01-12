const settings_tab = () => {
    settings_tab_show()
}

const settings_tab_show = () => {
    $('.tab').css('display', 'none')
    $('#settings_tab').css('display', 'flex')
}
const settings_tab_hide = () => {
    $('#settings_tab').css('display', 'none')
    $('#apps_tab').css('display', 'block')
    // $('#settings_tab').empty()

    // $('#app_info_tab_close').off('click.close')
}