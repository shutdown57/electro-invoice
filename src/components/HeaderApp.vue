<template>
  <b-navbar>
    <template slot="end">
      <b-navbar-dropdown label="Info">
        <b-navbar-item tag="router-link" :to="{ path: '/about' }">About</b-navbar-item>
        <b-navbar-item href="#">Contact</b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="مشتریان">
        <b-navbar-item tag="router-link" :to="{ path: '/client/create' }">ایجاد مشتری</b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item href="#">Documentation</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "HeaderApp"
};
</script>

<style scoped>
.rtld {
  text-align: right;
  direction: rtl;
}
</style>