<template>
  <div id="app">
    <HeaderApp></HeaderApp>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
import HeaderApp from "./components/HeaderApp";
import Database from "./mixin/Database";

export default {
  components: {
    HeaderApp
  },
  created() {
    setTimeout(() => {
      Database.init();
    }, 3000);
  }
};
</script>

<style lang="scss"></style>
