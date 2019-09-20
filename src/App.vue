<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <HeaderApp></HeaderApp>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
import HeaderApp from "./components/HeaderApp";

export default {
  components: {
    HeaderApp
  }
};
</script>

<style lang="scss">
</style>
