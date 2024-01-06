use winreg::enums::*;
use winreg::RegKey;
use regex::Regex;

#[tauri::command]
///returns current windows accent color in hex
pub fn get_accent_color() -> String{
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let apps = hkcu.open_subkey("Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Accent").unwrap();

    let acm: u32 = apps.get_value("AccentColorMenu").unwrap();

    return process_string(format!("{:x}", acm))
}
///ffd47800 -> #0078d4
fn process_string(input: String) -> String{
    // println!("{}", input);
    let without_ff = input.trim_start_matches(['f', 'F']);

    let reg = Regex::new(r"(.{1,2})").unwrap();
    let mut temp: Vec<&str> = vec![];

    for (_, [group]) in reg.captures_iter(without_ff).map(|c| c.extract()) {
        temp.push(group)
    }
    temp.reverse();

    return format!("#{}", temp.join(""))
}