import {type RouteRecordRaw} from 'vue-router'
import MainPage from './MainPage.vue'
import Cocktail from "./Cocktail";
import {useCocktail} from "../../modules/cocktail/store/cocktailStore";


const Main: RouteRecordRaw = {
    name: 'Main',
    path: '/',
    component: MainPage,
    redirect: () => {
        const {items} = useCocktail()
        return {
            name: 'Cocktail',
            params: {
                code: items[0]
            }
        }
    },
    children: [
        Cocktail
    ],
}

export default Main
