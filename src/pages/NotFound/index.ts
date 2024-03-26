import {type RouteRecordRaw} from 'vue-router'
import NotFoundPage from "./NotFoundPage.vue";

const NotFoundRoute: RouteRecordRaw = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
}

export default NotFoundRoute
