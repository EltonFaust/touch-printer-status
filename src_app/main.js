// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');

const processor = require('./processor');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    let windowData = {};

    if (process.env.NODE_ENV === 'development') {
        windowData = {
            width: 800,
            height: 600,
        };
    } else {
        windowData = {
            fullscreen: true,
        };
    }

    // Create the browser window.
    mainWindow = new BrowserWindow({
        ...windowData,
        darkTheme: true,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (process.env.NODE_ENV === 'development') {
        // load url for vue serve
        mainWindow.loadURL('http://localhost:8080');

        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        // load the index.html of the app.
        mainWindow.loadFile(path.resolve(path.join(__dirname, '..', 'dist', 'index.html')));
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
processor.listen();
