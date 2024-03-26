<template>
  <ul class="sidebar__menu">
    <li v-for="item in items">
      <router-link :to="`/cocktail/${item}`">{{ item }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {useCocktail} from "../modules/store/cocktailStore";
import {storeToRefs} from "pinia";

const cocktailStore = useCocktail()
const {items} = storeToRefs(cocktailStore)
</script>

<style lang="scss" scoped>
.sidebar__menu {
  padding: 0 20px;

  li {
    list-style: none;
  }
}
</style>
