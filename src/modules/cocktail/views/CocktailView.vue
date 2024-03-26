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
import {cocktailApi, Drink} from "../../../api/cocktailApi";
import {onBeforeRouteUpdate} from "vue-router";
import {useCocktail} from "../../store/cocktailStore";
import {storeToRefs} from "pinia";

const cocktailStore = useCocktail()
const {cocktails, items} = storeToRefs(cocktailStore)

const cocktailCode = ref<string>(items.value[0])
const ingredientsList = ref<{ ingredient: string, measure: string, drink: string }[]>([])
const drinks = ref<Drink[]>([])

function addElementToArray(array, elementKey = 'strIngredient') {
  for (let i = 0; i < array.length; i++) {
    array[i].ingredients = [];
    for (let j = 1; j <= 15; j++) {
      if (array[i][elementKey + j]) {
        let ingredient = {
          name: array[i][elementKey + j],
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
  ingredientsList.value = addElementToArray(drinks.value)
}


onBeforeRouteUpdate(async (to: object, from) => {
  if (to.params.code !== from.params.code) {
    cocktailCode.value = to.params.code ?? ''
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
