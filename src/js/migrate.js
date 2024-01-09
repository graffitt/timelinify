const migrate_apps_1_to_2 = async () => {
    if(APPS.version === 1 && VERSIONS.apps === 2){
        APPS.active.forEach(async (app, index) => {
            app.id = await invoke('blake3_export', {input: app.name})

            await invoke('delete_icon', {icon_file_name: app.icon})

            await invoke('get_exe_icon', {
                exe_path: app.target_file,
                icon_name: app.id
            })

            if(!app.icon.startsWith('http')){
                app.icon = `${app.id}.png`
            }
            if(index === APPS.active.length - 1){
                APPS.version = VERSIONS.apps
                APPS_save(true)

                setTimeout(() => window.location.reload(), 300)
            }
        })
    }
}

const migrate = async () => {
    await migrate_apps_1_to_2()
}