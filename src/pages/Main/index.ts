import {type RouteRecordRaw} from 'vue-router'
import MainPage from './MainPage.vue'
import Cocktail from "./Cocktail";


const Main: RouteRecordRaw = {
    name: 'Main',
    path: '/',
    component: MainPage,
    redirect: to => {
        return {name: 'Cocktail', params: {code: 'margarita'}}
    },
    children: [
        Cocktail
    ]
}

export default Main
