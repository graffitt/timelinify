const file_options = {dir: BaseDirectory.Home, recursive: true}

const apps_template = {
    version: 2,
    active: []
}
const init_file_structure = (startup = false) => {
    exists('.timelinify', file_options).then(result => {
        if(!result){
            createDir('.timelinify', file_options)
        }
    })
    exists('.timelinify/apps.json', file_options).then(result => {
        if(!result){
            writeTextFile('.timelinify/apps.json', JSON.stringify(startup ? apps_template : APPS, null, 2), file_options)
        }
    })
    exists('.timelinify/history.json', file_options).then(result => {
        if(!result){
            writeTextFile('.timelinify/history.json', JSON.stringify(startup ? '[]' : HISTORY, null, 2), file_options)
        }
    })
    exists('.timelinify/icons', file_options).then(result => {
        if(!result){
            createDir('.timelinify/icons', file_options)
        }
    })
}
// init_file_structure(true)