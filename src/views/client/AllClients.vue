<template>
  <section class="container">
    <TableClients></TableClients>
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">چاپ</button>
      </p>
    </b-field>
  </section>
</template>

<script>
import TableClients from "@/components/client/TableClients.vue";
import { mapGetters } from 'vuex';

export default {
  name: "AllClients",
  components: {
    TableClients
  },
  computed: {
      ...mapGetters({
          clients: 'getClients'
      })
  },
  methods: {
      print() {
          this.$store.dispatch('printAllCustomers', this.clients)
      }
  }
};
</script>