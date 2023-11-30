const add_new_app = async (app = {}, startup = false) => {
    // create elements at startup without creating ui elements and file saving
    const {id, name, display_name, target_file, usage_time_s} = app
    let {icon} = app

    if(!APPS.active.some(i => i.name === name) || startup){

        if(!icon.startsWith('http') && await invoke('has_icon', {exe_path: target_file})){
            icon = convertFileSrc(ICON_PATH + `${id}.ico`)
            app.icon = `${id}.ico`
        }

        !startup ? APPS.active.push(app) : undefined

        let admin = await invoke('check_admin', {exe_path: target_file})
        console.warn(admin)

        $('#app_new').before(/*html*/`
            <div class="app_card" data-id="${id}"">
                <div class="app_icon_container app_inner_container">
                    <img class="app_icon" src="${icon}">
                </div>
                <div class="app_text_container app_inner_container">
                    <span class="app_title" title="${display_name}">${display_name}</span>
                    <span class="app_usage_time">${unix_to_hms(usage_time_s, 0, false)}</span>
                </div>
                <div class="app_buttons_container app_inner_container">
                    <button class="app_run" title="Run app">${admin ? '⚠️' : '▶'}</button>
                    <div class="app_buttons_sub_container">
                        <button class="app_info" title="App info">🛈</button>
                        <button class="app_move" title="Move app to history">→</button>
                        <button class="app_delete" title="Delete app">🗑</button>
                    </div>
                </div>
            </div>
        `)

        $('.app_icon').on('error', (event) => {
            $(event.target).attr('src', './img/placeholder.png')
        })

        if(!admin){
            $('.app_run').off('click')
            $('.app_run').on('click', (event) => {app_run(event)})
        }

        $('.app_info').off('click')
        $('.app_info').on('click', (event) => {app_info($(event.target).parents('.app_card')[0].dataset.id, APPS.active)})

        $('.app_move').off('click')
        $('.app_move').on('click', (event) => {app_move($(event.target).parents('.app_card')[0].dataset.id, APPS.active, HISTORY)})

        $('.app_delete').off('click')
        $('.app_delete').on('click', (event) => {app_delete($(event.target).parents('.app_card')[0].dataset.id, APPS.active)})

        !startup ? APPS_save() : undefined
    }
    else{
        console.warn(`${name} already exists`)
    }
}
$('#app_new').on('click', () => {
    invoke('add_new_app').then(app => {
        app = JSON.parse(app)
        if(app !== null){
            add_new_app(app)

            invoke('get_exe_icon', {
                exe_path: app.target_file,
                icon_name: app.id
            })
        }
    })
})