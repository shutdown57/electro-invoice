<template>
  <b-navbar>
    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">درباره</b-navbar-item>
      <b-navbar-dropdown label="محصولات">
        <b-navbar-item tag="router-link" :to="{ path: '/client/create' }">ایجاد مشتری</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/client/update' }">ویرایش مشتری</b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="فاکتورها">
        <b-navbar-item tag="router-link" :to="{ path: '/client/create' }">ایجاد مشتری</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/client/update' }">ویرایش مشتری</b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="مشتریان">
        <b-navbar-item tag="router-link" :to="{ path: '/clients/create' }">ایجاد مشتری</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/clients/' }">ویرایش مشتری</b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">صفحه اصلی</b-navbar-item>
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