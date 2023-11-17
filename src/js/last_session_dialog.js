const last_session_dialog = (app, run_data, duration) => {
    const {display_name} = app
    let {icon} = app

    if(!icon.startsWith('http')){
        icon = convertFileSrc(ICON_PATH + icon)
    }

    $('#last_session_dialog').html(/*html*/`
        <header>Last session</header>
        <main class="app_confirm_dialog_text_container">
            <img src="${icon}" class="app_confirm_dialog_icon" onerror="this.src = './img/placeholder.png'">
            <div class="text_column column">
                <span class="line"><span class="key">App</span> <span class="value">${display_name}</span></span><br>
                <span class="line"><span class="key">Start</span> <span class="value">${iso_display(run_data.start, false)}</span></span><br>
                <span class="line"><span class="key">End</span> <span class="value">${iso_display(run_data.end, false)}</span></span><br>
                <span class="line"><span class="key">Duration</span> <span class="value">${unix_to_hms(duration, 1)}</span></span><br>
            </div>
        </main>
        <footer>
            <button id="last_session_dialog_button_OK">Ok</span></button>
        </footer>
    `)
    console.log(`last session: ${display_name} - ${unix_to_hms(duration)}`)

    last_session_dialog_show()
}

const last_session_dialog_show = () => {
    $('#last_session_dialog').css('display', 'flex')
    $('#dialogs_container').css('display', 'grid')

    $('#last_session_dialog_button_OK').on('click.dialog_hide', () => {
        last_session_dialog_hide()
    })

    $(window).on('keydown.dialog_hide', (e) => {
        if(e.key === 'Enter' || e.key === 'Escape'){
            $('#last_session_dialog_button_OK').trigger('click')
        }
    })
}
const last_session_dialog_hide = () => {
    $('#dialogs_container').css('display', 'none')
    $('#last_session_dialog').css('display', 'none')
    $('#last_session_dialog').empty()

    $('#last_session_dialog_button_OK').off('click')
    $(window).off('keydown.dialog_hide')
}