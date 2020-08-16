const path = require('path');

const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const settingsService = require('./services/settings');

let db;

const printerListener = require('./listeners/printer');
const noteListener = require('./listeners/note');

function listen() {
    // ipcMain.on('fetch-settings', async (event) => {
    //     event.reply('fetch-settings-reply', await db.all('SELECT * FROM setting'));
    // });

    // printers
    ipcMain.on('printers-list', async (event) => {
        event.reply('printers-list-reply', await printerListener.list());
    });

    ipcMain.on('printer-get', async (event, id) => {
        event.reply('printer-get-reply', await printerListener.get(id));
    });

    ipcMain.on('printer-get-in-use-pins', async (event) => {
        event.reply('printer-get-in-use-pins-reply', await printerListener.getInUsePins());
    });

    ipcMain.on('printer-save', async (event, { id, data }) => {
        event.reply('printer-save-reply', await printerListener.save(id, data));
    });

    // notes
    ipcMain.on('note-list-drawns', async (event) => {
        event.reply('note-list-drawns-reply', await noteListener.list());
    });

    ipcMain.on('note-get', async (event, id) => {
        event.reply('note-get-reply', await noteListener.get(id));
    });

    ipcMain.on('note-drawn-save', async (event, { id, content }) => {
        event.reply('note-drawn-save-reply', await noteListener.save(id, content));
    });

    ipcMain.on('note-rename', async (event, { id, title }) => {
        await noteListener.rename(id, title);
        event.reply('note-rename-reply');
    });

    ipcMain.on('note-drawn-duplicate', async (event, id) => {
        event.reply('note-drawn-duplicate-reply', await noteListener.duplicate(id));
    });

    ipcMain.on('note-remove', async (event, id) => {
        await noteListener.remove(id);
        event.reply('note-remove-reply');
    });

    // ipcMain.on('asynchronous-message', (event, arg) => {
    //     console.log(arg) // prints "ping"
    //     event.reply('asynchronous-reply', 'pong')
    // });

    // ipcMain.on('synchronous-message', (event, arg) => {
    //     console.log(arg) // prints "ping"
    //     event.returnValue = 'pong'
    // });
}

(async () => {
    db = await sqlite.open(
        {
            filename: path.resolve(__dirname, '..', 'data', 'db.sqlite'),
            driver: sqlite3.Database,
        },
    );

    await db.migrate({ migrationsPath: path.resolve(__dirname, '..', 'migrations') });

    settingsService.use(db);
    printerListener.use(db);
    noteListener.use(db);
})();

module.exports = {
    listen,
};
