<template>
    <div class="printer-config">
        <nav-actions></nav-actions>
        <b-container>
            <b-row>
                <b-col>
                    <b-form @submit.stop.prevent="submit">
                        <b-form-group label="Identifier:" label-for="identifer" description="Printer unique identification, could be his OctoPrint access port.">
                            <b-form-input id="identifer"
                                v-model="printer.identifer"
                                type="text" required
                                placeholder="Enter printer identifer">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group label="Name:" label-for="name">
                            <b-form-input id="name"
                                v-model="printer.name"
                                type="text" required
                                placeholder="Enter printer name">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group label="GPIO to control light:" label-for="light_pin">
                            <b-form-select id="light_pin"
                                v-model="printer.light_pin"
                                :options="pinOptions">
                            </b-form-select>
                        </b-form-group>
                        <b-button type="submit" variant="success">
                            {{ printerRecord ? 'Save' : 'Add' }} printer
                        </b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style lang="scss" scoped>
    .printer-config {
    }
</style>

<script>
import { ACTIONS } from '@/store/_types';

export default {
    name: 'printer-config',
    data() {
        return {
            printer: {
                name: null,
                identifer: null,
                light_pin: null,
            },
            // keyboardInstace: null,
        };
    },

    computed: {
        printerRecord() {
            return this.$store.state.printer;
        },
        pinOptions() {
            const options = [
                {
                    text: 'Disabled',
                    value: null,
                },
            ];

            [5, 6, 12, 13, 16, 19, 20, 21, 26].forEach((pin) => {
                const inUse = (!this.printerRecord || this.printerRecord.light_pin !== pin)
                    && this.$store.state.printerInUsePins.indexOf(pin) !== -1;

                options.push({
                    text: `GPIO${pin}${inUse ? ' (in use)' : ''}`,
                    value: pin,
                    disabled: inUse,
                });
            });

            return options;
        },
    },

    methods: {
        submit() {
            console.log('Submit');
        },
    },

    mounted() {
        // window.ipcRenderer.once('note-list-drawns-reply', (event, notes) => {
        //     this.notes = notes;
        // });

        // window.ipcRenderer.send('note-list-drawns');
    },

    asyncData({ store }) {
        return store.dispatch(ACTIONS.FETCH_IN_USE_PINS);
    },
};
</script>
