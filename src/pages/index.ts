import {createRouter, createWebHistory} from 'vue-router'
import Main from './Main'
import NotFound from "./NotFound";

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        Main,
        NotFound
    ]
})
