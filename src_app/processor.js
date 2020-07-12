const path = require('path');

const { ipcMain } = require('electron');
const sqlite = require('sqlite');
const settingsService = require('./services/settings');

let db;

const noteListener = require('./listeners/note');

function listen() {
    // ipcMain.on('fetch-settings', async (event) => {
    //     event.reply('fetch-settings-reply', await db.all('SELECT * FROM setting'));
    // });

    ipcMain.on('note-list-drawns', async (event) => {
        event.reply('note-list-drawns-reply', await noteListener.list());
    });

    ipcMain.on('note-get', async (event, id) => {
        event.reply('note-get-reply', await noteListener.get(id));
    });

    ipcMain.on('note-drawn-save', async (event, arg) => {
        event.reply('note-drawn-save-reply', await noteListener.save(arg.id, arg.content));
    });

    ipcMain.on('note-rename', async (event, arg) => {
        await noteListener.rename(arg.id, arg.title);
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
    db = await sqlite.open(path.resolve(__dirname, '..', 'data', 'db.sqlite'), { Promise });
    await sqlite.migrate();

    settingsService.use(db);
    noteListener.use(db);
})();

module.exports = {
    listen,
};
