const add_app = async (app = {}) => {
    const {target_file} = app
    let {icon} = app

    if(/*!icon.startsWith('http') &&*/ await invoke('icon_file_exists', {name: icon})){
        icon = convertFileSrc(ICON_PATH + icon)
    }

    let require_admin = await invoke('check_admin', {exe_path: target_file})
    add_app_ui_element(app, icon, require_admin)
}

const add_app_new = async (app = {}) => {
    const {id, name, target_file} = app
    let {icon} = app

    if(!APPS.active.some(i => i.name === name)){
        if(!icon.startsWith('http') && await invoke('icon_file_exists', {name: icon})){
            icon = convertFileSrc(ICON_PATH + icon)
        }

        APPS.active.push(app)

        let require_admin = await invoke('check_admin', {exe_path: target_file})
        add_app_ui_element(app, icon, require_admin)

        APPS_save()
    }
    else{
        console.warn(`${name} already exists`)
    }
}

const add_app_ui_element = (app = {}, icon = '', require_admin = false) => {
    const {id, display_name, usage_time_s} = app

    let app_run_button_icon = require_admin ? LAUNCHED_AS_ADMIN ? '▶' : '⚠️' : '▶'


    let app_card = /*html*/`
        <div class="app_card" data-id="${id}">
            <div class="app_icon_container app_inner_container">
                <img class="app_icon" src="${icon}">
            </div>
            <div class="app_text_container app_inner_container">
                <span class="app_title" title="${display_name}">${display_name}</span>
                <span class="app_usage_time">${unix_to_hms(usage_time_s, 0, false)}</span>
            </div>
            <div class="app_buttons_container app_inner_container">
                <button class="app_run" title="${localize(LOCALE.run_button_title)}">${app_run_button_icon}</button>
                <div class="app_buttons_sub_container">
                    <button class="app_info" title="${localize(LOCALE.info_button_title)}">🛈</button>
                    <button class="app_move" title="${localize(LOCALE.move_button_title)}">→</button>
                    <button class="app_delete" title="${localize(LOCALE.delete_button_title)}">🗑</button>
                </div>
            </div>
        </div>`

    // if #app_new exists
    if($('#app_new').length){
        $('#app_new').before(app_card)
    }
    else{
        $('#apps_container').append(app_card)
    }

    $('.app_icon').on('error', (event) => {
        $(event.target).attr('src', './img/placeholder.png')
    })

    if(require_admin && !LAUNCHED_AS_ADMIN){
        $(`.app_card[data-id="${id}"] .app_run`).addClass('require_admin')
        $(`.app_card[data-id="${id}"] .app_run`).prop('disabled', true)
        $(`.app_card[data-id="${id}"] .app_run`).attr('title', LOCALE.run_button_title_adm)
    }
    else{
        $(`.app_card[data-id="${id}"] .app_run`).on('click', (event) => {app_run(event)})
    }

    $('.app_info').off('click')
    $('.app_info').on('click', (event) => {app_info($(event.target).parents('.app_card')[0].dataset.id, APPS.active)})

    $('.app_move').off('click')
    $('.app_move').on('click', (event) => {app_move($(event.target).parents('.app_card')[0].dataset.id, APPS.active, HISTORY)})

    $('.app_delete').off('click')
    $('.app_delete').on('click', (event) => {app_delete($(event.target).parents('.app_card')[0].dataset.id, APPS.active)})
}

$('#app_new').on('click', () => {
    invoke('add_app_new').then(app => {
        app = JSON.parse(app)

        if(app !== null){
            invoke('get_exe_icon', {
                exe_path: app.target_file,
                icon_name: app.id
            })

            add_app_new(app)
        }
    })
})