<template>
  <section class="left-top">
    <b-field dir="rtl" position="is-centered">
      <b-autocomplete
        placeholder="جستجو فاکتور ..."
        :data="filteredDataArray"
        @select="SingleInvoice"
        v-model="id"
        icon="magnify"
        :keep-first="true"
        field="id"
        :open-on-focus="true"
        rounded
      ></b-autocomplete>
    </b-field>
    {{ selected }}
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchInvoiceId",
  data() {
    return {
      id: "",
      selected: null
    };
  },
  async mounted() {
    await this.$store.dispatch("getInvoices");
  },
  computed: {
    ...mapGetters({
      invoices: "getInvoices"
    }),
    filteredDataArray() {
      if (this.invoices) {
        return this.invoices.filter(option => {
          return option.id
            .toString()
            .toLowerCase()
            .includes(this.id.toString());
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    SingleInvoice(select) {
      this.$store.dispatch("addCurrentInvoice", select);
      this.$router.push("/invoices/single");
    }
  }
};
</script>

<style scoped>
.left-top {
  margin-left: 20px;
  margin-top: 10px;
}
</style>
