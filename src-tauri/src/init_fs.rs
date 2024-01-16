use std::collections::HashMap;
use std::fs::{create_dir, write, metadata};
use std::path::PathBuf;
use dirs_next;

use crate::iso8601::iso8601;

#[tauri::command(rename_all = "snake_case")]
/// in js use slash or double backslash
pub fn file_exist(path: String) -> bool{
    let abs_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify").join(path);

    if abs_path.exists(){
        return true
    }
    else {
        return false
    }
}

#[tauri::command(rename_all = "snake_case")]
/// in js use slash or double backslash
pub fn get_file_metadata(path: String) -> String{
    let abs_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify").join(path);

    if abs_path.exists(){
        return String::from(format!("{{\"created\":\"{0}\",\"modified\":\"{1}\",\"accessed\":\"{2}\"}}",
            iso8601(&metadata(&abs_path).unwrap().created().unwrap()),
            iso8601(&metadata(&abs_path).unwrap().modified().unwrap()),
            iso8601(&metadata(&abs_path).unwrap().accessed().unwrap())
        ))
    }
    else {
        return String::from(format!("{{\"created\":\"null\",\"modified\":\"null\",\"accessed\":\"null\"}}"))
    }
}

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