<script lang="ts" setup>
import Sidebar from "../components/Sidebar.vue";</script>

<template>
  <div class="app">
    <div class="app__sidebar">
      <Sidebar/>
    </div>
    <div class="app__divider"></div>
    <div class="app__main">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  gap: 5px;
  height: 100%;

  &__main {
    width: 100%;
  }
}
</style>
