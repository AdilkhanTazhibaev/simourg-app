import {createRouter, createWebHistory} from 'vue-router'
import Main from './Main'

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        Main
    ]
})
