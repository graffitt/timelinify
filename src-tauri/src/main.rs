// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use native_dialog::FileDialog;
use std::path::{Path, PathBuf};
use chrono;
use serde::{Serialize, Deserialize};
use blake3;

pub mod init_fs;
use init_fs::init_file_structure;

pub mod iso8601;
use iso8601::{DT_FORMAT/*, iso8601*/};

pub mod run;
use run::run_app;

pub mod exe_icon;
use exe_icon::*;

pub mod admin;
use admin::{check_admin, is_process_elevated};

pub mod accent_color;
use accent_color::get_accent_color;

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
fn add_app_new() -> Option<String>{
    let file_path = choose_file();

    match file_path{
        Some(path) => {
            let name = String::from(Path::new(&path).file_name().unwrap().to_os_string().into_string().unwrap().split('.').nth(0).unwrap());
            let hash = blake3::hash(&name.as_bytes()).to_string();

            let app = App{
                id: hash.clone(),
                name: name.clone(),
                display_name: name.clone(),
                icon: format!("{0}.png", &hash),
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
    println!("v{}", env!("CARGO_PKG_VERSION"));

    init_file_structure();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // open_explorer,
            init_file_structure,

            add_app_new,
            run_app,

            icon_file_exists,
            exe_has_icon,
            get_exe_icon,
            delete_icon,
            delete_unnecessary_icons,

            check_admin,
            is_process_elevated,
            get_accent_color
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}