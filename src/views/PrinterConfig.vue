<template>
    <div class="printer-config">
        <nav-actions></nav-actions>
    </div>
</template>

<style lang="scss" scoped>
    .printer-config {
    }
</style>

<script>
export default {
    name: 'printer-config',
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
