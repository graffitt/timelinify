use std::thread;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::time::Duration;

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
// https://stackoverflow.com/questions/33911792/how-do-i-share-access-to-an-atomicbool-between-threads/67880071#67880071
#[tauri::command(rename_all = "snake_case")]
pub fn run_app(id: String, name: String, target: String) -> Option<String>{
    let path = Path::new(&target);
    if path.exists(){
        let start = chrono::offset::Local::now().format(DT_FORMAT).to_string();
        let start2 = start.clone();

        let stop = Arc::new(AtomicBool::new(false));
        let stop_me = stop.clone();

        thread::spawn(move || {
            if PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify").exists(){
                loop {
                    fs::write(
                        PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify\\_unfinished.json"),
                        format!("{{\n  \"id\": \"{0}\",\n  \"name\": \"{1}\",\n  \"start\": \"{2}\"\n}}", &id, &name, &start2)
                    ).expect("Unable to write file");

                    if stop_me.load(Ordering::Relaxed){
                        break;
                    }

                    thread::sleep(Duration::from_millis(5000));
                }
            }
        });

        let _app = Command::new(target).output();
        stop.store(true, Ordering::Relaxed);
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