
import { ACTIONS, ACTION_MODES, MUTATIONS } from './_types';

export default {
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
