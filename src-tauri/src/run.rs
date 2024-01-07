use std::path::Path;
use std::path::PathBuf;
use std::fs;
use std::process::Command;
use serde::{Serialize, Deserialize};
use dirs_next;
use crate::iso8601::DT_FORMAT;

#[derive(Serialize, Deserialize)]
pub struct Session{
    start: String,
    end: String
}

#[tauri::command(rename_all = "snake_case")]
pub fn run_app(id: String, name: String, target: String) -> Option<String>{
    let path = Path::new(&target);
    if path.exists(){
        let start = chrono::offset::Local::now().format(DT_FORMAT).to_string();

        if PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify").exists(){
            fs::write(
                PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify\\_unfinished.json"),
                format!("{{\n  \"id\": \"{0}\",\n  \"name\": \"{1}\",\n  \"start\": \"{2}\"\n}}", &id, &name, &start)
            ).expect("Unable to write file");
        }
        let _app = Command::new(target).output();
        let end = chrono::offset::Local::now().format(DT_FORMAT).to_string();

        if start != end{
            let ses = Session{
                start,
                end
            };

            Some(serde_json::to_string(&ses).unwrap())
        }
        else{
            None
        }
    }
    else{
        None
    }
}