import {type RouteRecordRaw} from 'vue-router'
import CocktailPage from "./CocktailPage.vue";

const CocktailRoute: RouteRecordRaw = {
    name: 'Cocktail',
    path: '/cocktail/:code',
    component: CocktailPage,
}

export default CocktailRoute
