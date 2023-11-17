const APPS_save = (force = false) => {
    let save_start = performance.now()
    let temp = JSON.stringify(APPS, null, 2)
    let temp_hash = Sha256.hash(temp)

    // console.warn(JSON.stringify(APPS, null, 2))
    // console.warn('before save', APPS_hash)
    // console.warn(temp)
    // console.warn('before save', temp_hash)
    if((temp_hash !== APPS_hash) || force){
        exists('.timelinify', file_options).then(result => {
            if(result){
                writeTextFile('.timelinify/apps.json', temp, file_options)
            }
            else{
                init_file_structure()
            }
        })
        APPS_backup()

        APPS_hash = temp_hash
        let save_end = performance.now()
        console.log(`----APPS saved ${((save_end - save_start) / 1000).toFixed(3)}s ${(new TextEncoder().encode(temp)).length / 1000} KB----`)
        // console.warn('after save', APPS_hash)
    }
}
const APPS_backup = () => {
    exists('.timelinify', file_options).then(result => {
        if(result){
            writeTextFile('.timelinify/apps.bak', JSON.stringify(APPS, null, 2), file_options)
        }
        else{
            init_file_structure()
        }
    })
}
const APPS_save_sessions = () => {
    let temp = []
    APPS.active.forEach(i => {
        temp.push({
            id: i.id,
            name: i.name,
            sessions: i.sessions
        })
    })
    exists('.timelinify', file_options).then(result => {
        if(result){
            writeTextFile('.timelinify/sessions.json', JSON.stringify(temp, null, 2), file_options)
        }
        else{
            init_file_structure()
        }
    })
}
const HISTORY_save = () => {
    exists('.timelinify', file_options).then(result => {
        if(result){
            writeTextFile('.timelinify/history.json', JSON.stringify(HISTORY, null, 2), file_options)
        }
        else{
            init_file_structure()
        }
    })
}

$('#apps_save').on('click', () => {
    APPS_save(true)
})