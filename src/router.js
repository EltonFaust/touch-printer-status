import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/printer/add',
            name: 'printer-add',
            component: () => import(/* webpackChunkName: "page-printer-config" */ './views/PrinterConfig.vue'),
        },
        {
            path: '/printer/edit/:id',
            name: 'printer-edit',
            component: () => import(/* webpackChunkName: "page-printer-config" */ './views/PrinterConfig.vue'),
        },
        {
            path: '/printer/view/:id',
            name: 'printer-view',
            component: () => import(/* webpackChunkName: "page-printer-view" */ './views/PrinterView.vue'),
        },
        {
            path: '/notes',
            name: 'notes',
            component: () => import(/* webpackChunkName: "page-notes" */ './views/Notes.vue'),
        },
        {
            path: '/notes/drawn',
            name: 'note-drawn',
            component: () => import(/* webpackChunkName: "page-note-drawn" */ './views/NoteDrawn.vue'),
        },
        {
            path: '/notes/drawn/:id',
            name: 'note-edit-drawn',
            component: () => import(/* webpackChunkName: "page-note-drawn" */ './views/NoteDrawn.vue'),
        },
        // {
        //     path: '/note-drawn',
        //     name: 'note-drawn',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "note-drawn" */ './views/NoteDrawn.vue'),
        // },
    ],
});
