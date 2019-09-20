<template>
  <section class="container">
    <h1 class="has-text-centered title is-3">صفحه اصلی</h1>
    <TableClients></TableClients>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import * as sqlite from 'sqlite3'
import TableClients from "@/components/client/TableClients";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    TableClients
  },
  computed: {
    clients() {
      return this.$store.getters.getClients;
    }
  }
};
</script>
