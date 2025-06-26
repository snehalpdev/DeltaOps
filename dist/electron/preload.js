"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/electron/preload.ts
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (msg) => electron_1.ipcRenderer.send('message', msg),
    onMessage: (callback) => electron_1.ipcRenderer.on('reply', (_event, msg) => callback(msg))
});
