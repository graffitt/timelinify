use winreg::enums::HKEY_CURRENT_USER;
use winreg::RegKey;
use is_elevated::is_elevated;

#[tauri::command(rename_all = "snake_case")]
pub fn check_admin(exe_path: String) -> bool{
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let path = "Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers";

    let apps = match hkcu.open_subkey(path){
        Ok(_) => hkcu.open_subkey(path).unwrap(),
        Err(_error) => return false
    };

    for (key, value) in apps.enum_values().map(|x| x.unwrap()){
        if key.contains(&exe_path){
            if value.to_string().contains("RUNASADMIN"){
                return true
            }
            else{
                return false
            }
        }
    }
    return false
}

#[tauri::command()]
pub fn is_process_elevated() -> bool{
    if is_elevated(){
        return true
    }
    else{
        return false
    }
}