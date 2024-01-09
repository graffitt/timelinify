const migrate = async () => {
    await migrate_apps_1_to_2()
}

const migrate_apps_1_to_2 = async () => {
    if(APPS.version < VERSIONS.apps){
        APPS.active.forEach(app => {
            app.id = invoke('blake3_export', {input: app.id})

            invoke('delete_icon', {icon_file_name: icon})

            invoke('get_exe_icon', {
                exe_path: app.target_file,
                icon_name: app.id
            })

            if(!app.icon.startsWith('http')){
                app.icon = `${app.id}.png`
            }
        })
    }
}