<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import VHeader from 'base/v-header/v-header'

export default {
  name: 'app',
  components: {
    VHeader
  },
  
}
</script>

<style>
</style>
