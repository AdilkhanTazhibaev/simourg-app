<template>
  <div>
    <h2>{{ cocktailCode }}</h2>
    <div class="cocktail-view">
      <H4>List of ingredients</H4>
      <ul class="cocktail-view__items">
        <li v-for="(drink, index) in drinks" :key="index" class="cocktail-view__items__item">
          <h4>{{ drink.strDrink }}</h4>
          <div class="cocktail-view__items__item__content">
            <ul>
              <li v-for="(ingredient, idx) in drink.ingredients" :key="idx">
                {{ ingredient.name }}
              </li>
            </ul>
            <img :src="drink.strDrinkThumb" loading="lazy" width="500px"/>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {cocktailApi, Drink} from "../../api/cocktailApi";
import {onBeforeRouteUpdate, RouteLocation, useRoute} from "vue-router";
import {useCocktail} from "./store/cocktailStore";
import {storeToRefs} from "pinia";

const cocktailStore = useCocktail()
const {params} = useRoute()
const {cocktails} = storeToRefs(cocktailStore)

const cocktailCode = ref<string>(<string>params?.code)
const drinks = ref<Drink[]>([])

interface Ingredient {
  name: string;
}

const addElementToArray = (array: Drink[], elementKey: string = 'strIngredient'): Drink[] => {
  for (let i: number = 0; i < array.length; i++) {
    array[i].ingredients = [];
    for (let j = 1; j <= 15; j++) {
      const ingredientName = `${elementKey}${j}` as keyof Drink
      if (array[i][ingredientName]) {
        let ingredient = <Ingredient>{
          name: array[i][ingredientName],
        };
        array[i].ingredients.push(ingredient);
      }
    }
  }
  return array;
}


const fetchData = async () => {
  if (cocktails.value?.[cocktailCode.value]?.length) {
    drinks.value = cocktails.value[cocktailCode.value]
  } else {
    try {
      const {data} = await cocktailApi.getCocktailByCode(cocktailCode.value)
      drinks.value = data.drinks
      cocktailStore.setCocktail(cocktailCode.value, drinks.value)
    } catch (e) {
      console.log(e)
    }
  }
  addElementToArray(drinks.value)
}


onBeforeRouteUpdate(async (to: RouteLocation, from) => {
  if (to.params.code !== from.params.code) {
    cocktailCode.value = <string>to.params?.code
    await fetchData()
  }
})

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.cocktail-view {
  &__items {
    &__item {
      &__content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
