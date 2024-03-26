import {defineStore} from "pinia";
import {ref} from "vue";
import {Drink} from "../../../api/cocktailApi";

interface Cocktail {
    [key: string]: Drink[]
}

export const useCocktail = defineStore('cocktail', () => {
    const cocktails = ref<Cocktail>({})
    const items = ref<string[]>([
        'margarita',
        'mojito',
        'a1',
        'kir'
    ])
    const setCocktail = (key: string, cocktail: Drink[]) => {
        cocktails.value = {
            ...cocktails.value,
            [key]: cocktail,
        }
    }
    return {
        cocktails,
        items,
        setCocktail
    }
})
