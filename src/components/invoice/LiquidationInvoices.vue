<template>
  <section>
    <h2 class="has-text-centered title is-4">جدول حسابهای تسویه نشده</h2>
    <b-table
      :data="isEmpty ? [] : invoices"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-position="paginationPosition"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="شماره" width="40" numeric>{{ props.row.id }}</b-table-column>

        <b-table-column field="total_amount" label="هزینه کل فاکتور" centered>{{ props.row.total_amount }}</b-table-column>

        <b-table-column field="name" label="نام و نام خانوادگی مشتری" centered>{{ props.row.name }}</b-table-column>

        <b-table-column field="liquidation" label="تسویه" sortable centered>
          <b-icon :icon="isLiquidation(props.row.liquidation)"></b-icon>
        </b-table-column>

        <b-table-column field="rent_start" label="تاریخ شروع اجاره" centered>
          <span
            class="tag is-success"
          >{{ props.row.rent_start ? new Date(props.row.rent_start).toLocaleDateString() : '----------' }}</span>
        </b-table-column>

        <b-table-column field="rent_end" label="تاریخ اتمام اجاره" centered>
          <span
            class="tag is-success"
          >{{ props.row.rent_end ? new Date(props.row.rent_end).toLocaleDateString() : '----------' }}</span>
        </b-table-column>

        <b-table-column field="created" label="تاریخ ایجاد" centered>
          <span
            class="tag is-success"
          >{{ props.row.created ? new Date(props.row.created).toLocaleDateString() : '----------' }}</span>
        </b-table-column>

        <b-table-column field="updated" label="تاریخ بروزرسانی" centered>
          <span
            class="tag is-success"
          >{{ props.row.updated ? new Date(props.row.updated).toLocaleDateString() : '----------' }}</span>
        </b-table-column>

        <b-table-column field="ceremony_address" label="آدرس مراسم">{{ props.row.ceremony_address }}</b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-happy" size="is-large"></b-icon>
            </p>
            <p>موردی یافت نشد</p>
            <p>مشتریان تسویه خود را انجام داده‌اند</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LiquidationInvoices",
  computed: {
    ...mapGetters({
      invoices: "getLiquidationInvoices"
    }),
    isEmpty() {
      if (typeof this.invoices != undefined && this.invoices.length > 0) {
        return false;
      }
      return true;
    }
  },
  async mounted() {
    await this.$store.dispatch("liquidationInvoices");
  },
  data() {
    return {
      isBordered: true,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: true,
      isLoading: false,
      hasMobileCards: true,
      isPaginated: true,
      paginationPosition: "bottom",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5
    };
  },
  methods: {
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