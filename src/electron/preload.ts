// src/electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    sendPrompt: (prompt: string) => ipcRenderer.invoke('llm:prompt', prompt)
  });