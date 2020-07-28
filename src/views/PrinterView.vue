<template>
    <div class="printer-view">
        <nav-actions></nav-actions>
    </div>
</template>

<style lang="scss" scoped>
    .printer-view {
    }
</style>

<script>
export default {
    name: 'printer-view',
    // data() {
    //     return {
    //         notes: [],
    //         newTitle: '',
    //         editingId: null,
    //         keyboardInstace: null,
    //     };
    // },
    mounted() {
        // window.ipcRenderer.once('note-list-drawns-reply', (event, notes) => {
        //     this.notes = notes;
        // });

        // window.ipcRenderer.send('note-list-drawns');
    },
};
</script>
