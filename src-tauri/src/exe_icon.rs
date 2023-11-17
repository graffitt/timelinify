use exe::*;
use std::fs;
use std::path::PathBuf;

#[tauri::command(rename_all = "snake_case")]
pub fn get_exe_icon(exe_path: String, icon_name: String){
    // https://github.com/frank2/exe-rs/blob/main/examples/resources/src/main.rs
    let pe = VecPE::from_disk_file(exe_path).unwrap();
    let rsrc = ResourceDirectory::parse(&pe).unwrap();
    let icons = rsrc.icon_groups_single(&pe).unwrap();

    for (_id, dir) in &icons {
        let icon_file = dir.to_icon_buffer(&pe).unwrap();

        icon_file.save(PathBuf::from(dirs_next::home_dir().unwrap()).join(format!(".timelinify\\icons\\{}.ico", icon_name))).unwrap();
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn delete_icon(icon_name: String){
    let icon_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(format!(".timelinify\\icons\\{}.ico", icon_name));

    if icon_path.exists(){
        fs::remove_file(icon_path).unwrap();
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn delete_unnecessary_icons(mut existing_icons: Vec<String>){
    existing_icons = existing_icons.iter().map(|icon| format!("{0}{1}.ico", PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify\\icons\\").display(), icon)).collect();

    let all_icons: Vec<String> = fs::read_dir(PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify\\icons")).unwrap()
        .filter_map(|path| Some(path.ok().unwrap().path().into_os_string().into_string().unwrap()))
        .collect();

    let difference: Vec<String> = all_icons.into_iter().filter(|item| !existing_icons.contains(item)).collect();

    for path in &difference {
        if PathBuf::from(path).exists(){
            fs::remove_file(PathBuf::from(path)).unwrap();
        }
    }
}