// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use native_dialog::FileDialog;
use std::path::Path;
use std::path::PathBuf;
// use std::fs;
use chrono;
use serde::{Serialize, Deserialize};
use sha256::digest;
// use std::process::Command;

pub mod iso8601;
use iso8601::{DT_FORMAT/*, iso8601*/};

pub mod run;
use run::run_app;

pub mod exe_icon;
use exe_icon::{has_icon, get_exe_icon, delete_icon, delete_unnecessary_icons};

pub mod admin;
use admin::{check_admin, is_process_elevated};

//-----------------------------------------------

fn choose_file() -> Option<PathBuf>{
    FileDialog::new()
        .add_filter("Executable", &["exe"])
        .show_open_single_file()
        .unwrap()
}

#[derive(Serialize, Deserialize)]
pub struct App{
    id: String,
    name: String,
    display_name: String,
    icon: String,
    target_file: PathBuf,
    target_file_name: String,
    tracking_started: String,
    tracking_ended: String,
    // date_created: String,
    // date_modified: String,
    usage_time_s: u8,
    sessions: Vec<String>
}

#[tauri::command]
fn add_new_app() -> Option<String>{
    let file_path = choose_file();

    match file_path{
        Some(path) => {
            let name = String::from(Path::new(&path).file_name().unwrap().to_os_string().into_string().unwrap().split('.').nth(0).unwrap());
            let app = App{
                id: digest(&name),
                name: name.clone(),
                display_name: name.clone(),
                icon: String::from("./img/placeholder.png"),
                target_file: path.clone(),
                target_file_name: Path::new(&path).file_name().unwrap().to_os_string().into_string().unwrap(),
                tracking_started: chrono::offset::Local::now().format(DT_FORMAT).to_string(),
                tracking_ended: String::from(""),
                // date_created: iso8601(&fs::metadata(Path::new(&path)).expect("").created().expect("")),
                // date_modified: iso8601(&fs::metadata(Path::new(&path)).expect("").modified().expect("")),
                usage_time_s: 0,
                sessions: vec![]
            };

            Some(serde_json::to_string(&app).unwrap())
        }
        None => {None}
    }
}
// #[tauri::command]
// fn open_explorer(){
//     Command::new("explorer")
//         .arg("%UserProfile%") // <- Specify the directory you'd like to open.
//         .spawn( )
//         .unwrap( );
// }
// rust-analyzer type hints
fn main(){
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // open_explorer,
            add_new_app,
            run_app,
            has_icon,
            get_exe_icon,
            delete_icon,
            delete_unnecessary_icons,
            check_admin,
            is_process_elevated
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}