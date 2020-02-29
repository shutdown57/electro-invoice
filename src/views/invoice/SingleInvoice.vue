<template>
  <section dir="rtl" class="container">
    <!-- <form id="single-invoice"> -->
      <!-- <b-field horizontal label="شماره فاکتور"> -->
        <!-- <b-input v-model="invoice.id" expanded disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="هزینه اجناس"> -->
        <!-- <b-input v-model="invoice.invoice_amount" expanded disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="هزینه حمل و نقل"> -->
        <!-- <b-input v-model="invoice.transport_amount" expanded disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="هزینه خسارت"> -->
        <!-- <b-input v-model="invoice.damage_amount" expanded disabled></b-input> -->
      <!-- </b-field> -->
      <!-- <b-field horizontal label="هزینه کل"> -->
        <!-- <b-input v-model="invoice.total_amount" expanded disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="تاریخ شروع اجاره"> -->
        <!-- <b-input v-model="invoice.rent_start" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="تاریخ اتمام اجاره"> -->
        <!-- <b-input v-model="invoice.rent_end" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="مدت اجاره"> -->
        <!-- <b-input v-model="invoice.rent_period" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="نام مشتری"> -->
        <!-- <b-input v-model="invoice.name" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <br />> -->
<!--  -->
      <!-- <b-field horizontal label="تسویه حساب"> -->
        <!-- <b-checkbox v-model="invoice.liquidation" true-value="1" false-value="0" disabled></b-checkbox> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="تخفیف"> -->
        <!-- <b-input v-model="invoice.discount" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="بیعانه"> -->
        <!-- <b-input v-model="invoice.deposit_amount" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="مبلغ پرداختنی"> -->
        <!-- <b-input v-model="invoice.payable_amount" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="آدرس مراسم"> -->
        <!-- <b-input type="textarea" v-model="invoice.ceremony_address" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <b-field horizontal label="توضیحات"> -->
        <!-- <b-input type="textarea" v-model="invoice.description" disabled></b-input> -->
      <!-- </b-field> -->
<!--  -->
      <!-- <br /> -->
      <!-- <br /> -->
<!--  -->
      <!-- <table class="table"> -->
        <!-- <thead> -->
          <!-- <tr> -->
            <!-- <th> -->
              <!-- <abbr title="شماره">شماره</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right">محصول</th> -->
            <!-- <th class="has-text-right"> -->
              <!-- <abbr title="فی">فی</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right"> -->
              <!-- <abbr title="تعداد">تعداد</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right"> -->
              <!-- <abbr title="قیمت">قیمت</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right"> -->
              <!-- <abbr title="توضیحات">توضیحات</abbr> -->
            <!-- </th> -->
            <!-- <th></th> -->
          <!-- </tr> -->
        <!-- </thead> -->
        <!-- <tfoot> -->
          <!-- <tr> -->
            <!-- <th> -->
              <!-- <abbr title="Position">شماره</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right">محصول</th> -->
            <!-- <th class="has-text-right"> -->
              <!-- <abbr title="فی">فی</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right"> -->
              <!-- <abbr title="تعداد">تعداد</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right"> -->
              <!-- <abbr title="قیمت">قیمت</abbr> -->
            <!-- </th> -->
            <!-- <th class="has-text-right">توضیحات</th> -->
            <!-- <th></th> -->
          <!-- </tr> -->
        <!-- </tfoot> -->
        <!-- <tbody> -->
          <!-- <tr v-for="(singleProduct, index) in products" :key="index"> -->
            <!-- <th>{{ index + 1 }}</th> -->
            <!-- <td>{{ singleProduct.name }}</td> -->
            <!-- <td> -->
              <!-- <b-input type="number" v-model.number="singleProduct.fee" disabled></b-input> -->
            <!-- </td> -->
            <!-- <td> -->
              <!-- <b-input type="number" v-model.number="singleProduct.number" disabled></b-input> -->
            <!-- </td> -->
            <!-- <td> -->
              <!-- <PriceCalculation -->
                <!-- :fee="singleProduct.fee" -->
                <!-- :number="singleProduct.number" -->
                <!-- :disabled="true" -->
                <!-- @rowPrice="singleProduct.price = $event" -->
              <!-- ></PriceCalculation> -->
            <!-- </td> -->
            <!-- <td> -->
              <!-- <b-input v-model="singleProduct.description" disabled></b-input> -->
            <!-- </td> -->
          <!-- </tr> -->
        <!-- </tbody> -->
      <!-- </table> -->
    <!-- </form> -->
    <br />
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">چاپ</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-warning" @click="updateInvoice()">ویرایش</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-danger" @click="deleteInvoice()">حذف</button>
      </p>
    </b-field>
    <hr>
    <InvoiceClient id="single-invoice" :info="invoice" :products="products"></InvoiceClient>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PriceCalculation from "@/components/invoice/PriceCalculation";
import InvoiceClient from "@/components/print/InvoiceClient";

export default {
  name: "SingleInvoice",
  components: {
    PriceCalculation,
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
