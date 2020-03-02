<template>
  <section dir="rtl" class="container">
    <br />
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">
          چاپ
        </button>
      </p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-warning" @click="updateInvoice()">
          ویرایش
        </button>
      </p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-danger" @click="deleteInvoice()">
          حذف
        </button>
      </p>
    </b-field>
    <hr />
    <InvoiceClient
      id="single-invoice"
      :info="invoice"
      :products="products"
    ></InvoiceClient>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import InvoiceClient from "@/components/print/InvoiceClient";

export default {
  name: "SingleInvoice",
  components: {
    InvoiceClient
  },
  computed: {
    ...mapGetters({
      invoice: "getInvoice",
      products: "getInvoiceProduct"
    })
  },
  async mounted() {
    await this.$store.dispatch("getInvoiceProducts", this.invoice.id);
  },
  methods: {
    print() {
      this.$store.dispatch("printOneInvoice");
    },
    updateInvoice() {
      this.$store.dispatch("addCurrentInvoice", this.invoice);
      this.$router.push("/invoices/update");
    },
    deleteInvoice() {
      this.$buefy.dialog.confirm({
        title: "حذف فاکتور",
        message: "آیا مایل به حذف این فاکتور هستید؟",
        confirmText: "حذف فاکتور",
        cancelText: "لغو",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch("deleteInvoice", this.invoice.id);
          this.$buefy.notification.open({
            message: "فاکتور مورد نظر با موفقیت حذف شد",
            type: "is-success"
          });
          setTimeout(() => {
            this.$router.push("/invoices");
          }, 3000);
        }
      });
    }
  }
};
</script>
