<template>
  <section class="container">
    <h1 class="has-text-centered title is-2">صفحه اصلی</h1>
    <SearchInvoiceId></SearchInvoiceId>
    <hr />
    <h2 class="has-text-centered title is-4">جدول مشتریان</h2>
    <TableClients></TableClients>
    <hr />
    <LiquidationInvoices></LiquidationInvoices>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import * as sqlite from 'sqlite3'
import TableClients from "@/components/client/TableClients";
import SearchInvoiceId from '@/components/search/SearchInvoiceId';
import LiquidationInvoices from "@/components/invoice/LiquidationInvoices";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    TableClients,
    LiquidationInvoices,
    SearchInvoiceId
  },
  computed: {
    clients() {
      return this.$store.getters.getClients;
    }
  }
};
</script>
