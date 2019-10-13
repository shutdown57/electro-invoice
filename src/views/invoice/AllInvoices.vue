<template>
  <section>
    <h1 class="has-text-centered title is-3">صفحه محصولات</h1>
    <b-table
      id="table-client"
      :data="isEmpty(invoices) ? [] : invoices"
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
      @click="addInvoice"
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
          label="هزینه اجناس"
          sortable
          centered
        >{{ props.row.invoice_amount }}</b-table-column>

        <b-table-column field="name" label="هزینه کل" sortable centered>{{ props.row.total_amount }}</b-table-column>

        <b-table-column field="name" label="تخفیف" sortable centered>{{ props.row.discount }}</b-table-column>

        <b-table-column field="name" label="بیعانه" sortable centered>{{ props.row.deposit_amount }}</b-table-column>

        <b-table-column
          field="name"
          label="مبلغ پرداختنی"
          sortable
          centered
        >{{ props.row.payable_amount }}</b-table-column>

        <b-table-column field="name" label="مدت اجاره" sortable centered>{{ props.row.rent_period }}</b-table-column>

        <b-table-column
          field="name"
          label="آدرس مراسم"
          sortable
          centered
        >{{ props.row.ceremony_address }}</b-table-column>

        <b-table-column field="name" label="تسویه" sortable centered>
          <b-icon :icon="isLiquidation(props.row.liquidation)"></b-icon>
        </b-table-column>
        <b-table-column field="name" label="نام مشتری" sortable centered>{{ props.row.name }}</b-table-column>

        <b-table-column field="date" label="تاریخ پایان اجاره" sortable centered>
          <span
            class="tag is-info rtld"
          >{{ props.row.rent_end ? new Date(props.row.rent_end).toLocaleDateString() : '----------' }}</span>
        </b-table-column>

        <b-table-column field="date" label="تاریخ ایجاد" sortable centered>
          <span class="tag is-success rtld">{{ new Date(props.row.created).toLocaleDateString() }}</span>
        </b-table-column>
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
  name: "AllInvoices",
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
    await this.$store.dispatch("getInvoices");
  },
  computed: {
    ...mapGetters({
      invoices: "getInvoices"
    })
  },
  methods: {
    addInvoice(select) {
      this.$store.dispatch("addCurrentInvoice", select);
      this.$router.push("/invoices/single");
    },
    isEmpty(arr) {
      if (arr.length > 0) {
        return false;
      }
      return true;
    },
    print() {
      this.$store.dispatch("printAllInvoices", this.invoices);
    },
    isLiquidation(liquid) {
      if (liquid == 1) {
        return "check";
      } else if (liquid == 0) {
        return "close";
      }
    }
  }
};
</script>