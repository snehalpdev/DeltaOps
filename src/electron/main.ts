import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import fetch from 'node-fetch';
import 'dotenv/config';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 🧠 IPC handler for LLM prompt
ipcMain.handle('llm:prompt', async (_event, prompt: string) => {
  try {
    const response = await fetch('https://your-llm-api.com/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    return data.output ?? 'No output received from LLM.';
  } catch (error) {
    console.error('[LLM Error]', error);
    return 'An error occurred while processing the prompt.';
  }
});