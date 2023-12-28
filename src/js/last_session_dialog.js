const last_session_dialog = async (app, run_data, duration) => {
    const {id, display_name} = app
    let {icon} = app


    if(!icon.startsWith('http') && await exists(`.timelinify/icons/${id}.ico`, file_options)){
        icon = convertFileSrc(ICON_PATH + icon)
    }

    let duration_ignore_max = 300// seconds
    let ignore_button

    if(duration < duration_ignore_max){
        ignore_button = /*html*/`<button id="last_session_dialog_button_Ignore">${localize(LOCALE.last_s_dialog_button_ignore)}</button>`
    }
    else{
        ignore_button = ''
    }

    $('#last_session_dialog').html(/*html*/`
        <header>${localize(LOCALE.last_s_dialog_header)}</header>
        <main>
            <img src="${icon}" class="app_confirm_dialog_icon">
            <div class="text_column column">
                <span class="line"><span class="key">${localize(LOCALE.last_s_dialog_app)}</span> <span class="value">${display_name}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.last_s_dialog_start)}</span> <span class="value">${iso_display(run_data.start, false)}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.last_s_dialog_end)}</span> <span class="value">${iso_display(run_data.end, false)}</span></span><br>
                <span class="line"><span class="key">${localize(LOCALE.last_s_dialog_duration)}</span> <span class="value">${unix_to_hms(duration, 1)}</span></span><br>
            </div>
        </main>
        <footer>
            <button id="last_session_dialog_button_OK">${localize(LOCALE.last_s_dialog_button_ok)}</span></button>
            ${ignore_button}
        </footer>
    `)

    $('.app_confirm_dialog_icon').on('error', (event) => {
        $(event.target).attr('src', './img/placeholder.png')
    })

    $('#last_session_dialog main .key').css('width', `${LOCALE.last_s_dialog_key_width}px`)

    $('#last_session_dialog_button_OK, #last_session_dialog_button_Ignore').on('click.dialog_hide', () => {
        last_session_dialog_hide()
    })

    $('#last_session_dialog_button_Ignore').on('click', () => {
        if(app.sessions.at(-1).end === run_data.end){
            app.sessions.splice(-1, 1)
            APPS_save()
        }
    })

    console.log(`last session: ${display_name} - ${unix_to_hms(duration, 1)}`)

    last_session_dialog_show()
}
window.last_session_dialog = last_session_dialog

const last_session_dialog_show = () => {
    $('#last_session_dialog').css('display', 'flex')
    $('#dialogs_container').css('display', 'grid')

    $(window).on('keydown.dialog_hide', (e) => {
        if(e.key === 'Enter' || e.key === 'Escape'){
            // $('#last_session_dialog_button_OK').trigger('click')
            last_session_dialog_hide()
        }
    })
}
const last_session_dialog_hide = () => {
    $('#dialogs_container').css('display', 'none')
    $('#last_session_dialog').css('display', 'none')
    $('#last_session_dialog').empty()

    $('#last_session_dialog_button_OK, last_session_dialog_button_Ignore').off('click')
    $(window).off('keydown.dialog_hide')
}