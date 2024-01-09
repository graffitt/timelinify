use winreg::enums::HKEY_CURRENT_USER;
use winreg::RegKey;
use regex::Regex;

#[tauri::command(rename_all = "snake_case")]
/// returns current windows accent color in hex
///
/// default color - 0xffd77800 (4292311040) [src](https://learn.microsoft.com/en-us/windows-hardware/customize/desktop/unattend/microsoft-windows-shell-setup-themes-windowcolor#values)
pub fn get_accent_color(alpha: bool) -> String{
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let path = "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Accent";

    let default_color_dec: u32 = 4292311040;
    let default_color_hex: String = String::from("#0078d7");

    let accent = match hkcu.open_subkey(path){
        Ok(_) => hkcu.open_subkey(path).unwrap(),
        Err(_error) => return default_color_hex
    };

    let color_hex: u32 = accent.get_value("AccentColorMenu").unwrap_or_else(|_| {default_color_dec});

    return hex_to_color(format!("{:x}", color_hex), alpha)
}
/// ffd47800 -> #0078d4
fn hex_to_color(mut color_hex: String, alpha: bool) -> String{
    if !alpha {
        color_hex = color_hex.trim_start_matches(['f', 'F']).to_string()
    }

    let reg = Regex::new(r"(.{1,2})").unwrap();
    let mut temp: Vec<&str> = vec![];

    for (_, [group]) in reg.captures_iter(&color_hex).map(|c| c.extract()) {
        temp.push(group)
    }
    temp.reverse();

    return format!("#{}", temp.join(""))
}