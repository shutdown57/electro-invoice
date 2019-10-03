<template>
  <section>
    <h1 class="has-text-centered title is-3">صفحه محصولات</h1>
    <b-table
      id="table-client"
      :data="isEmpty(products) ? [] : products"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :sort-icon-size="sortIconSize"
      :selected.sync="selected"
      @click="addClient"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      focusable
    >
      <template slot-scope="props">
        <b-table-column field="id" label="شماره" width="40" sortable numeric>{{ props.row.id }}</b-table-column>

        <b-table-column field="name" label="نام محصول" sortable centered>{{ props.row.name }}</b-table-column>

        <b-table-column field="date" label="تاریخ بروز رسانی" sortable centered>
          <span
            class="tag is-info rtld"
          >{{ props.row.updated ? new Date(props.row.updated).toLocaleDateString() : '----------' }}</span>
        </b-table-column>

        <b-table-column field="date" label="تاریخ ایجاد" sortable centered>
          <span class="tag is-success rtld">{{ new Date(props.row.created).toLocaleDateString() }}</span>
        </b-table-column>

        <b-table-column
          field="description"
          label="توضیحات"
          sortable
          centered
        >{{ props.row.description }}</b-table-column>
      </template>
    </b-table>
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">چاپ</button>
      </p>
    </b-field>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AllProducts",
  data() {
    return {
      selected: {},
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      isBordered: true,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 60
    };
  },
  async mounted() {
    await this.$store.dispatch("getProducts");
  },
  computed: {
    ...mapGetters({
      products: "getProducts"
    })
  },
  methods: {
    addClient(select) {
      this.$store.dispatch("addCurrentProduct", select);
      this.$router.push("/products/single");
    },
    isEmpty(arr) {
      if (arr.length > 0) {
        return false;
      }
      return true;
    },
    print() {
      this.$store.dispatch('printAllProducts', this.products)
    }
  }
};
</script>