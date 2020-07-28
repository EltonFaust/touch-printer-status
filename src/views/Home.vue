<template>
    <div class="home">
        <b-container fluid class="actions">
            <b-row v-for="(group, gidx) of actionGroups" :key="gidx">
                <b-col v-for="(item, iidx) of group" :key="iidx">
                    <router-link v-if="item !== null" :to="item.to" class="border rounded highlight">
                        <div class="action-label">
                            <div class="item-icon"><i class="material-icons">{{ item.icon }}</i></div>
                            <div class="item-label">{{ item.label }}</div>
                        </div>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="bottom-actions">
            <div class="edit-button" v-if="$store.state.printers.length > 0">
                <div class="click-area" @click="edit"></div>
                <div class="click-button" @click="edit"><i class="material-icons">{{ editing ? 'check' : 'edit' }}</i></div>
            </div>
            <div class="center-actions">
                <div class="action-buttons">
                    <router-link :to="{ name: 'notes' }" class="btn btn-warning">
                        <i class="material-icons">notes</i> Notes
                    </router-link>
                    <span style="padding: 0 5px;"></span>
                    <router-link :to="{ name: 'note-drawn' }" class="btn btn-warning">
                        <i class="material-icons">note_add</i> Add note
                    </router-link>
                </div>
            </div>
            <div class="close-button">
                <div class="click-area" @click="close"></div>
                <div class="click-button" @click="close"><i class="material-icons">close</i></div>
            </div>
            <b-modal id="modal-close" title="Close app" @ok="confirmClose">
                <p class="my-4">Do you want to close the app?</p>
            </b-modal>
        </b-container>
    </div>
</template>

<style lang="scss" scoped>
    .home {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .actions {
            flex: 1;
            display: flex;
            flex-direction: column;

            .row {
                flex: 50%;
                margin-left: -10px;
                margin-right: -10px;

                .col {
                    padding: 5px;

                    a {
                        display: flex;
                        height: 100%;
                        align-items: center;
                        text-align: center;

                        .action-label {
                            flex: 1;

                            .item-icon {
                                font-size: 2rem;
                            }
                        }
                    }
                }
            }
        }


        .bottom-actions {
            height: 60px;

            .center-actions {
                display: flex;
                height: 100%;
                text-align: center;
                align-items: center;

                .action-buttons {
                    flex: 1;
                }
            }
        }
        .edit-button {
            left: -45px;

            .click-button {
                right: 20px;
                top: 18px;
            }
        }
        .close-button {
            right: -45px;

            .click-button {
                left: 20px;
                top: 20px;
            }
        }

        .edit-button,
        .close-button {
            padding: 5px;
            position: fixed;
            bottom: -45px;
            font-size: 20px;
            line-height: 1;
            z-index: 1;

            .click-area {
                width: 80px;
                height: 80px;
                background-color: $highlight-primary;
                transform: rotate(45deg);
            }

            .click-button {
                position: absolute;
                color: $highlight-secondary;
            }
        }
    }
</style>

<script>
import { ACTIONS } from '@/store/_types';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
// import ipcRenderer from 'electron';

export default {
    name: 'home',
    data: () => (
        {
            editing: false,
        }
    ),
    computed: {
        actionGroups() {
            const groups = [];
            const actions = this.$store.state.printers.slice(0);

            if (actions.length < 4) {
                if (this.editing || actions.length === 0) {
                    actions.push({ to: { name: 'printer-add' }, label: 'Add printer', icon: 'add' });
                }
            }

            actions.push(...(new Array(4 - actions.length).fill(null)));

            actions.forEach((item, idx) => {
                if (idx % 2 === 0) {
                    groups.push([]);
                }

                groups[groups.length - 1].push(item);
            });

            return groups;
        },
    },
    methods: {
        edit() {
            this.editing = !this.editing;
        },
        close() {
            this.$bvModal.show('modal-close');
        },
        confirmClose() {
            window.close();
        },
        // clk() {
        //     // window.test();
        //     // alert(window.ipcRenderer.sendSync('synchronous-message', 'ping'));

        //     // window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        //     //     alert(arg);
        //     // });

        //     // window.ipcRenderer.send('asynchronous-message', 'ping');
        // },
    },

    // asyncData({ store }) {
    //     return Promise.all(
    //         [
    //             store.dispatch(ACTIONS.FETCH_SETTINGS),
    //             store.dispatch(ACTIONS.FETCH_HOME_ACTIONS),
    //         ],
    //     );
    // },

    asyncData({ store }) {
        return store.dispatch(ACTIONS.FETCH_PRINTERS);
    },
};
</script>
