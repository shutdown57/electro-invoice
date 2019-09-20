<template>
  <section>
    <b-table
      :data="isEmpty(clients) ? [] : clients"
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

        <b-table-column
          field="name"
          label="نام و نام خانوادگی"
          sortable
          centered
        >{{ props.row.name }}</b-table-column>

        <b-table-column field="phone" label="تلفن ثابت" sortable centered>{{ props.row.phone }}</b-table-column>

        <b-table-column field="mobile" label="تلفن همراه" sortable centered>{{ props.row.mobile }}</b-table-column>

        <b-table-column
          field="updated"
          label="تاریخ بروز رسانی"
          sortable
          centered
        >{{ props.row.updated }}</b-table-column>

        <b-table-column field="date" label="تاریخ ایجاد" sortable centered>
          <span class="tag is-success rtld">{{ new Date(props.row.created).toLocaleDateString() }}</span>
        </b-table-column>

        <b-table-column field="address" label="آدرس" sortable centered>{{ props.row.address }}</b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TableClients",
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
      perPage: 10
    };
  },
  computed: {
    ...mapGetters({
      client: "getClient",
      clients: "getClients"
    })
  },
  async mounted() {
    this.data = await this.clients[0];
    await this.$store.dispatch("getClients");
  },
  methods: {
    addClient(select) {
      this.$store.dispatch("addCurrentClient", select);
      this.$router.push("/client/update");
    },
    isEmpty(arr) {
      if (arr.length > 0) {
        return false;
      }
      return true;
    }
  }
};
</script>