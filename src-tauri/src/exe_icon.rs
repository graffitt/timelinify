use exe::*;
use ico::IconDir;
use std::fs;
use std::path::PathBuf;
use dirs_next;

#[tauri::command(rename_all = "snake_case")]
pub fn icon_file_exists(name: String) -> bool{
    let icon_file_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify\\icons").join(name);

    if icon_file_path.exists(){
        return true
    }
    else {
        return false
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn exe_has_icon(exe_path: String) -> bool{
    let path = PathBuf::from(&exe_path);
    if path.exists(){
        let pe = VecPE::from_disk_file(exe_path).unwrap();

        let _rsrc = match ResourceDirectory::parse(&pe){
            Ok(_) => return true,
            Err(_error) => return false
        };
    }
    else {
        return false
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_exe_icon(exe_path: String, icon_name: String){
    // https://github.com/frank2/exe-rs/blob/main/examples/resources/src/main.rs
    let pe = VecPE::from_disk_file(exe_path).unwrap();
    // let rsrc = ResourceDirectory::parse(&pe).unwrap();
    let rsrc = match ResourceDirectory::parse(&pe){
        Ok(_) => ResourceDirectory::parse(&pe).unwrap(),
        Err(_error) => return
    };
    let icons = rsrc.icon_groups_single(&pe).unwrap();

    for (_id, dir) in &icons {
        let icon_file = dir.to_icon_buffer(&pe).unwrap();
        let save_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(".timelinify\\icons");
        icon_file.save(&save_path.join(format!("{}.ico", icon_name))).unwrap();

        optimize_and_conv2_png(save_path, icon_name.clone());
    }
}
fn optimize_and_conv2_png(icon_path: PathBuf, icon_name: String){
    let file = std::fs::File::open(icon_path.join(format!("{}.ico", icon_name))).unwrap();
    let icon_dir = IconDir::read(file).unwrap();

    let mut vec = icon_dir.entries().to_vec();
    vec.sort_by_key(|a| a.width());

    let image = &vec.as_slice().last().unwrap().decode().unwrap();
    let file = std::fs::File::create(icon_path.join(format!("{}.png", icon_name))).unwrap();
    image.write_png(file).unwrap();

    if icon_path.join(format!("{}.ico", icon_name)).exists(){
        fs::remove_file(icon_path.join(format!("{}.ico", icon_name))).unwrap();
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn delete_icon(icon_name: String){
    let icon_path = PathBuf::from(dirs_next::home_dir().unwrap()).join(format!(".timelinify\\icons\\{}.png", icon_name));

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