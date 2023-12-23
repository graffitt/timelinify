const {locale} = window.__TAURI__.os
const {invoke, convertFileSrc} = window.__TAURI__.tauri
const {homeDir, resolveResource} = window.__TAURI__.path
const {createDir, readTextFile, writeTextFile, exists, BaseDirectory} = window.__TAURI__.fs
const {appWindow, PhysicalSize} = window.__TAURI__.window
const {getVersion} = window.__TAURI__.app
const {exit} = window.__TAURI__.process