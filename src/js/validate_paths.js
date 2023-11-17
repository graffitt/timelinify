const validate_paths = async (apps = []) => {
    let non_existent = []

    for(const app of apps){
        if(await exists(app.target_file, file_options) === false){
            non_existent.push(app)
        }
    }

    return non_existent
}