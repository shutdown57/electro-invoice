<template>
  <section dir="rtl" class="container">
    <form id="single-invoice">
      <table class="table">
        <thead>
          <tr>
            <th>
              <abbr title="شماره">شماره</abbr>
            </th>
            <th class="has-text-right">محصول</th>
            <th class="has-text-right">
              <abbr title="فی">فی</abbr>
            </th>
            <th class="has-text-right">
              <abbr title="تعداد">تعداد</abbr>
            </th>
            <th class="has-text-right">
              <abbr title="قیمت">قیمت</abbr>
            </th>
            <th class="has-text-right">
              <abbr title="توضیحات">توضیحات</abbr>
            </th>
            <th></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>
              <abbr title="Position">شماره</abbr>
            </th>
            <th class="has-text-right">محصول</th>
            <th class="has-text-right">
              <abbr title="فی">فی</abbr>
            </th>
            <th class="has-text-right">
              <abbr title="تعداد">تعداد</abbr>
            </th>
            <th class="has-text-right">
              <abbr title="قیمت">قیمت</abbr>
            </th>
            <th class="has-text-right">توضیحات</th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="(singleProduct, index) in products" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ singleProduct.name }}</td>
            <td>
              <b-input type="number" v-model.number="singleProduct.fee" disabled></b-input>
            </td>
            <td>
              <b-input type="number" v-model.number="singleProduct.number" disabled></b-input>
            </td>
            <td>
              <PriceCalculation
                :fee="singleProduct.fee"
                :number="singleProduct.number"
                :disabled="true"
                @rowPrice="singleProduct.price = $event"
              ></PriceCalculation>
            </td>
            <td>
              <b-input v-model="singleProduct.description" disabled></b-input>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      <b-field horizontal label="هزینه اجناس">
        <b-input v-model="invoice.invoice_amount" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="هزینه حمل و نقل">
        <b-input v-model="invoice.transport_amount" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="هزینه خسارت">
        <b-input v-model="invoice.damage_amount" expanded disabled></b-input>
      </b-field>
      <b-field horizontal label="هزینه کل">
        <b-input v-model="invoice.total_amount" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="تاریخ شروع اجاره">
        <b-input v-model="invoice.rent_start" disabled></b-input>
      </b-field>

      <b-field horizontal label="تاریخ اتمام اجاره">
        <b-input v-model="invoice.rent_end" disabled></b-input>
      </b-field>

      <b-field horizontal label="مدت اجاره">
        <b-input v-model="invoice.rent_period" disabled></b-input>
      </b-field>

      <b-field horizontal label="نام مشتری">
        <b-input v-model="invoice.user_id" disabled></b-input>
      </b-field>

      <b-field horizontal label="تسویه حساب">
        <b-input v-model="invoice.liquidation" disabled></b-input>
      </b-field>

      <b-field horizontal label="آدرس مراسم">
        <b-input type="textarea" v-model="invoice.ceremony_address" disabled></b-input>
      </b-field>

      <b-field horizontal label="توضیحات">
        <b-input type="textarea" v-model="invoice.description" disabled></b-input>
      </b-field>
    </form>
    <br />
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">چاپ</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-warning" @click="updateInvoice()">ویرایش</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-danger">حذف</button>
      </p>
    </b-field>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PriceCalculation from "@/components/invoice/PriceCalculation";
export default {
  name: "SingleInvoice",
  components: {
    PriceCalculation
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
    }
  }
};
</script>