const app_confirm_dialog = async (app, message_type = -1) => {
    const {id, display_name} = app
    let {icon} = app

    if(!icon.startsWith('http') && await exists(`.timelinify/icons/${id}.ico`, file_options)){
        icon = convertFileSrc(ICON_PATH + icon)
    }

    let message = ``
    let header = ``
    switch(message_type){
        case -1:
        default: // test
            message = `test <b>${display_name}</b> test`
            header = `test`
            break

        case 0: // move
            message = `Do you really want to stop tracking <b>${display_name}</b> and move it to history?`
            header = `Move`
            break

        case 1: // delete
            message = `Do you really want to delete <b>${display_name}</b>?`
            header = `Delete`
            break
    }

    $('#app_confirm_dialog').html(/*html*/`
        <header>${header}</header>
        <div class="app_confirm_dialog_text_container">
            <img src="${icon}" class="app_confirm_dialog_icon">
            <span>${message}</span>
        </div>
        <div class="app_confirm_dialog_buttons_container">
            <button id="app_confirm_dialog_button_YES" class="app_confirm_dialog_button">Yes</button>
            <button id="app_confirm_dialog_button_NO" class="app_confirm_dialog_button">No</button>
        </div>
    `)

    $('.app_confirm_dialog_icon').on('error', (event) => {
        $(event.target).attr('src', './img/placeholder.png')
    })

    app_confirm_dialog_show()

    return await new Promise((resolve, reject) => {
        $('#app_confirm_dialog_button_YES').on('click', resolve)
        $('#app_confirm_dialog_button_NO').on('click', reject)
        $('#app_confirm_dialog_button_YES, #app_confirm_dialog_button_NO').on('click.dialog_hide', () => {
            app_confirm_dialog_hide()
        })

        $(window).on('keydown.dialog_hide', (e) => {
            if(e.key === 'Enter'){
                $('#app_confirm_dialog_button_YES').trigger('click')
            }
            else if(e.key === 'Escape'){
                $('#app_confirm_dialog_button_NO').trigger('click')
            }
        })
    })
        .then(() => true)
        .catch(() => false)
}

const app_confirm_dialog_show = () => {
    $('#app_confirm_dialog').css('display', 'flex')
    $('#dialogs_container').css('display', 'grid')
}
const app_confirm_dialog_hide = () => {
    $('#dialogs_container').css('display', 'none')
    $('#app_confirm_dialog').css('display', 'none')

    $('#app_confirm_dialog_button_YES, #app_confirm_dialog_button_NO').off('click')
    $(window).off('keydown.dialog_hide')
}