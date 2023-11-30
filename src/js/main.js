const {invoke, convertFileSrc} = window.__TAURI__.tauri
const {homeDir} = window.__TAURI__.path
const {exit} = window.__TAURI__.process
const {appWindow, PhysicalSize} = window.__TAURI__.window


let HOME_DIR
let ICON_PATH

homeDir().then(dir => {
    HOME_DIR = dir
    ICON_PATH = `${dir}/.timelinify/icons/`
})

const VERSIONS = {
    apps: 1
}
let APPS = {
    version: VERSIONS.apps,
    active: []
}
let APPS_hash = 0

let HISTORY = []

invoke('is_process_elevated').then(admin => {
    if(admin){
        console.error('admin')
    }
})
// let apps_temp = await readTextFile('.timelinify/apps.json', file_options)

readTextFile('.timelinify/apps.json', file_options).then(result => {
    APPS = JSON.parse(result)
    console.warn('active', APPS)

    let id_list = []
    APPS.active.forEach(app => {add_new_app(app, true), id_list.push(app.id)})

    // invoke('delete_unnecessary_icons', {
    //     existing_icons: id_list
    // })

    APPS_hash = Sha256.hash(JSON.stringify(APPS, null, 2))
    console.warn('active hash', APPS_hash)


    validate_paths(APPS.active).then(response => {
        if(response.length > 0){
            console.warn(response[0])
        }
    })
    // console.warn(unfinished_session())
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
    APPS_save_sessions()
})
// APPS_save_sessions()

// exit
$(window).on('keydown', (event) => {
    if(event.ctrlKey && event.code === 'KeyQ'){
        exit(1)
    }
})