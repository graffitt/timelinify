use chrono::prelude::{DateTime, Local};

// 2023-08-14T22:16:30+03:00
pub static DT_FORMAT: &str = "%Y-%m-%dT%H:%M:%S%:z";

pub fn iso8601(st: &std::time::SystemTime) -> String {
    let dt: DateTime<Local> = st.clone().into();
    format!("{}", dt.format(DT_FORMAT))
}
