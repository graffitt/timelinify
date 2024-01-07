getVersion().then(version => {
    $('#version').text(version)
    console.warn(`timelinify v${version}`)
})

const ICON_PATH = `${await homeDir()}/.timelinify/icons/`

// homeDir().then(dir => {
//     ICON_PATH = `${dir}/.timelinify/icons/`
// })

const VERSIONS = {
    apps: 1
}
let APPS = {
    version: VERSIONS.apps,
    active: []
}
let APPS_hash = 0

let HISTORY = []

const ACCENT_COLOR = await invoke('get_accent_color')

const LAUNCHED_AS_ADMIN = await invoke('is_process_elevated')
console.warn('launched as admin', LAUNCHED_AS_ADMIN)

// $('#apps_tab').html(/*html*/`
//     <div id="tool_bar">
//         <div id="sort_box" style="display: none"></div>
//         <button id="settings">⚙</button>
//         <button temp id="apps_save">💾</button>
//         <button temp id="calc">calc duration</button>
//         <button temp id="open">validate paths</button>
//         <input type="text" id="search_box" placeholder="search" role="search" autocomplete="off" spellcheck="false">
//     </div>
//     <div id="apps_container">
//         <button id="app_new" class="app_card service">+</button>
//     </div>
// `)

readTextFile('.timelinify/apps.json', file_options).then(result => {
    APPS = JSON.parse(result)
    console.warn('active', APPS)

    // let id_list = []
    APPS.active.forEach(app => {add_app(app)/*, id_list.push(app.id)*/})
    // console.warn('id list', id_list)
    // invoke('delete_unnecessary_icons', {
    //     existing_icons: id_list
    // })

    APPS_hash = Sha256.hash(JSON.stringify(APPS, null, 2))
    console.warn('active hash', APPS_hash)

    validate_paths(APPS.active).then(response => {
        if(response.length > 0){
            console.warn('does not exist', response[0])
        }
    })
    // console.warn(unfinished_session())
    window.APPS = APPS
})

exists('.timelinify/history.json', file_options).then(result => {
    if(result){
        readTextFile('.timelinify/history.json', file_options).then(result => {
            HISTORY = JSON.parse(result)
            console.warn('history', HISTORY)
        })
    }
})


const app_calc_usage_time = () => {
    APPS.active.forEach(app => {
        console.log(app.name)
        // if(app.sessions.length > 0){
        let temp = 0
        app.sessions.forEach(session => {
            temp += (new Date(session.end) - new Date(session.start)) / 1000
        })
        app.usage_time_s = temp
        $(`.app_card[data-id='${app.id}']`).find('.app_usage_time').text(unix_to_hms(app.usage_time_s, 0, false))
        console.error(unix_to_hms(app.usage_time_s, 0, false))
        // }
    })
}

$('#calc').on('click', () => {
    app_calc_usage_time()
    APPS_save()
    // appWindow.setSize(new PhysicalSize(774, 600))
})
$('#open').on('click', () => {
    // invoke('open_explorer')
    validate_paths(APPS.active).then(response => {
        if(response.length > 0){
            console.warn(response[0])
        }
        else{
            console.warn([])
        }
    })
    // APPS_save_sessions()
})

// exit
$(window).on('keydown', (event) => {
    if(event.ctrlKey && event.code === 'KeyQ'){
        exit(1)
    }
})

// invoke('init_file_structure')