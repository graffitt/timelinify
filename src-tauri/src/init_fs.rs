use std::collections::HashMap;
use std::fs::{create_dir, write};
use std::path::PathBuf;
use dirs_next;

#[tauri::command(rename_all = "snake_case")]
pub fn init_file_structure(){
    let folders = vec![
        ".timelinify",
        ".timelinify\\icons",
    ];
    let files = vec![
        ".timelinify\\settings.json",
        ".timelinify\\apps.json",
        ".timelinify\\history.json"
    ];

    let templates = HashMap::from([
        ("settings", format!("{{\n  \"lang\": \"en\"\n}}")),
        ("apps", format!("{{\n  \"version\": 1,\n  \"active\": []\n}}")),
        ("history", format!("[]")),
    ]);


    for folder in folders {
        let abs_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(folder);
        let exist = abs_path.exists();

        if !exist {
            create_dir(&abs_path).unwrap();

            println!("{0} - {1} - created", &abs_path.display(), exist)
        }
        else {
            println!("{0} - {1}", &abs_path.display(), exist)
        }
    }
    for file in files {
        let abs_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(file);
        let exist = abs_path.exists();

        if !exist {
            let key = &abs_path.file_stem().unwrap().to_str().unwrap();
            write(&abs_path, templates.get(key).unwrap()).unwrap();

            println!("{0} - {1} - created", &abs_path.display(), exist)
        }
        else {
            println!("{0} - {1}", &abs_path.display(), exist)
        }
    }
}