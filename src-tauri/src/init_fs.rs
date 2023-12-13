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
        ".timelinify\\apps.bak",
        ".timelinify\\history.json"
    ];

    let templates = HashMap::from([
        ("settings.json", format!("{{\n  \"lang\": \"en\"\n}}")),
        ("apps.json", format!("{{\n  \"version\": 1,\n  \"active\": []\n}}")),
        ("apps.bak", format!("{{\n  \"version\": 1,\n  \"active\": []\n}}")),
        ("history.json", format!("[]")),
    ]);


    for folder in folders {
        let abs_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(folder);
        let exist = abs_path.exists();

        if !exist {
            create_dir(&abs_path).unwrap();
        }
    }
    for file in files {
        let abs_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(file);
        let exist = abs_path.exists();

        if !exist {
            let key = &abs_path.file_name().unwrap().to_str().unwrap();
            write(&abs_path, templates.get(key).unwrap()).unwrap();
        }
    }
}