const format_slash = (string) => {
    // capture double and single slashes and backslashes
    return string.replace(/(\\{1,2})|([\/\/]{1,2})/g, '<l>$1$2</l>')
}

const app_info_tab = async (app) => {
    let has_sessions = app.sessions.length > 0 ? true : false
    let today_sessions = []
    let today_usage_time = 0

    if(app.sessions.length > 0){
        today_sessions = app.sessions.filter(session => is_today(new Date(session.start)))
    }
    if(today_sessions.length > 0){
        today_sessions.forEach(session => {
            today_usage_time += (new Date(session.end) - new Date(session.start)) / 1000
        })
    }

    let {icon} = app
    let icon2 = icon
    if(!icon.startsWith('http') && await exists(`.timelinify/icons/${app.id}.png`, file_options)){
        icon = convertFileSrc(ICON_PATH + icon)
    }

    $('#app_info_tab').html(/*html*/`
        <header>${app.display_name}</header>
        <main>
            <div class="icon_column column">
            <img class="app_info_tab_icon" src="${icon}">
            </div>
            <div class="text_column column">
                <span class="line"><span class="key">ID</span> <span class="value">${app.id}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.info_tab_usage_time)}</span> <span class="value">${unix_to_hms(app.usage_time_s, 1)} (${unix_to_hms(today_usage_time, 1)} ${localize(LOCALE.info_tab_today)})</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.info_tab_tracking_started)}</span> <span class="value">${iso_display(app.tracking_started, false)}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.info_tab_first_launch)}</span> <span class="value">${has_sessions ? iso_display(app.sessions[0].start, false) : 'never'}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.info_tab_last_launch)}</span> <span class="value">${has_sessions ? iso_display(app.sessions.at(-1).start, false) : 'never'}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.info_tab_file)}</span> <span class="value">${format_slash(app.target_file)}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.info_tab_icon)}</span> <span class="value">${format_slash(icon2)}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.info_tab_session)}</span> <span class="value">${app.sessions.length} (${today_sessions.length} ${localize(LOCALE.info_tab_today)})</span></span><br>
            </div>
        </main>
        <footer>
            <button id="app_info_tab_close">${localize(LOCALE.info_tab_close)}</button>
        </footer>
    `)

    $('.app_info_tab_icon').on('error', (event) => {
        $(event.target).attr('src', './img/placeholder.png')
    })

    $('.line .key').css('width', `${LOCALE.info_tab_key_width}px`)

    $('#app_info_tab_close').on('click.close', () => {
        app_info_tab_hide()
    })

    app_info_tab_show()
}

const app_info_tab_show = () => {
    $('.tab').css('display', 'none')
    $('#app_info_tab').css('display', 'flex')
}
const app_info_tab_hide = () => {
    $('#app_info_tab').css('display', 'none')
    $('#apps_tab').css('display', 'block')
    $('#app_info_tab').empty()

    $('#app_info_tab_close').off('click.close')
}