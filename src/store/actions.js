import { ACTIONS, ACTION_MODES, MUTATIONS } from './_types';

export default {
    // ------------ PRINTERS ------------
    [ACTIONS.FETCH_PRINTERS]: ({ commit }) => new Promise((resolve) => {
        window.ipcRenderer.once('printers-list-reply', (event, printers) => {
            commit(MUTATIONS.SET_PRINTERS, printers);
            resolve();
        });

        window.ipcRenderer.send('printers-list');
    }),
    [ACTIONS.FETCH_PRINTER]: ({ commit }, id) => new Promise((resolve) => {
        window.ipcRenderer.once('printer-get-reply', (event, printer) => {
            commit(MUTATIONS.SET_PRINTER, printer);
            resolve();
        });

        window.ipcRenderer.send('printer-get', id);
    }),
    [ACTIONS.FETCH_IN_USE_PINS]: ({ commit }) => new Promise((resolve) => {
        window.ipcRenderer.once('printer-get-in-use-pins-reply', (event, pins) => {
            commit(MUTATIONS.SET_IN_USE_PINS, pins);
            resolve();
        });

        window.ipcRenderer.send('printer-get-in-use-pins');
    }),

    // ------------ NOTES ------------
    [ACTIONS.FETCH_NOTES]: ({ commit }) => new Promise((resolve) => {
        window.ipcRenderer.once('note-list-drawns-reply', (event, notes) => {
            commit(MUTATIONS.SET_NOTES, notes);
            resolve();
        });

        window.ipcRenderer.send('note-list-drawns');
    }),
    [ACTIONS.SAVE_NOTE]: (_, { id, content }) => new Promise((resolve) => {
        window.ipcRenderer.once('note-drawn-save-reply', () => {
            resolve();
        });

        window.ipcRenderer.send('note-drawn-save', { id, content });
    }),
    [ACTIONS.DUPLICATE_NOTE]: ({ commit }, id) => new Promise((resolve) => {
        window.ipcRenderer.once('note-drawn-duplicate-reply', (event, note) => {
            commit(MUTATIONS.ADD_NOTE, { note, mode: ACTION_MODES.PREPEND_DATA });
            resolve();
        });

        window.ipcRenderer.send('note-drawn-duplicate', id);
    }),
    [ACTIONS.RENAME_NOTE]: ({ commit }, { editId, newTitle }) => new Promise((resolve) => {
        window.ipcRenderer.once('note-rename-reply', () => {
            commit(MUTATIONS.SET_NOTE_NAME, { editId, newTitle });
            resolve();
        });

        window.ipcRenderer.send('note-rename', { id: editId, title: newTitle });
    }),
    [ACTIONS.REMOVE_NOTE]: ({ commit }, removeId) => new Promise((resolve) => {
        window.ipcRenderer.once('note-remove-reply', () => {
            commit(MUTATIONS.DELETE_NOTE, removeId);
            resolve();
        });

        window.ipcRenderer.send('note-remove', removeId);
    }),
};
