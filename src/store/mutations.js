import Vue from 'vue';

import { ACTION_MODES, MUTATIONS } from './_types';

export default {
    [MUTATIONS.SET_AS_LOADING]: (state, isLoading) => {
        Vue.set(state, 'isLoading', isLoading);
    },

    // printers
    [MUTATIONS.SET_PRINTERS]: (state, printers) => {
        state.printers = printers;
    },
    [MUTATIONS.SET_PRINTER]: (state, printer) => {
        state.printer = printer;
    },
    [MUTATIONS.SET_IN_USE_PINS]: (state, printerInUsePins) => {
        state.printerInUsePins = printerInUsePins;
    },

    // notes
    [MUTATIONS.SET_NOTES]: (state, notes) => {
        state.notes = notes;
    },

    [MUTATIONS.ADD_NOTE]: (state, { note, mode }) => {
        if (mode === ACTION_MODES.PREPEND_DATA) {
            state.notes.unshift(note);
        } else if (mode === ACTION_MODES.APPEND_DATA) {
            state.notes.push(note);
        }
    },

    [MUTATIONS.SET_NOTE_NAME]: (state, { editId, newTitle }) => {
        const editIdx = state.notes.findIndex(({ id }) => id === editId);

        if (editIdx !== -1) {
            Vue.set(state.notes[editIdx], 'title', newTitle);
        }
    },

    [MUTATIONS.DELETE_NOTE]: (state, removeId) => {
        const rmIdx = state.notes.findIndex(({ id }) => id === removeId);

        if (rmIdx !== -1) {
            Vue.delete(state.notes, rmIdx);
        }
    },
};
