<template>
  <section class="container">
    <h1 class="has-text-centered title is-2">صفحه اصلی</h1>
    <h2 class="has-text-centered title is-4">جدول مشتریان</h2>
    <TableClients></TableClients>
    <hr />
    <LiquidationInvoices></LiquidationInvoices>
  </section>
</template>

<script>
import TableClients from "@/components/client/TableClients";
import LiquidationInvoices from "@/components/invoice/LiquidationInvoices";

export default {
  name: "home",
  components: {
    TableClients,
    LiquidationInvoices
  },
  computed: {
    clients() {
      return this.$store.getters.getClients;
    }
  }
};
</script>
