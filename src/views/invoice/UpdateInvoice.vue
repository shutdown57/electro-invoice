<template>
  <section class="container">
    <b-field grouped>
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
          <tr v-for="(singleProduct, index) in invoiceProducts" :key="index">
            <th>{{ index + 1 }}</th>
            <td>
              <b-select
                :placeholder="singleProduct.name"
                icon="cube-outline"
                v-model="singleProduct.product"
                rounded
              >
                <option
                  dir="rtl"
                  v-for="product in products"
                  :value="product"
                  :key="product.id"
                >{{ product.name }}</option>
              </b-select>
            </td>
            <td>
              <b-input type="number" v-model.number="singleProduct.fee"></b-input>
            </td>
            <td>
              <b-input type="number" v-model.number="singleProduct.number"></b-input>
            </td>
            <td>
              <PriceCalculation
                :fee="singleProduct.fee"
                :number="singleProduct.number"
                @rowPrice="singleProduct.price = $event"
              ></PriceCalculation>
            </td>
            <td>
              <b-input v-model="singleProduct.description"></b-input>
            </td>
            <td>
              <button class="button is-danger" @click="removeFromProductList(index)">
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-field>

    <div class="has-text-right">
      <button class="button is-success" @click="addToProductList">اضافه کردن محصول</button>
    </div>
    <hr />

    <b-field grouped>
      <b-field class="has-text-right" label="هزینه خسارت" expanded>
        <b-input dir="rtl" type="number" v-model.number="invoice.damage_amount" rounded required></b-input>
      </b-field>
      <b-field class="has-text-right" label="هزینه حمل و نقل" expanded>
        <b-input dir="rtl" type="number" v-model.number="invoice.transport_amount" rounded required></b-input>
      </b-field>
      <b-field class="has-text-right" label="هزینه اجناس" expanded>
        <b-input dir="rtl" type="number" v-model.number="invoice.invoice_amount" rounded required></b-input>
      </b-field>
    </b-field>

    <b-field class="rtld" grouped>
      <b-field class="has-text-right" label="تاریخ شروع اجاره">
        <datePicker format="jYYYY-jMM-jDD" v-model="invoice.rent_start"></datePicker>
      </b-field>
      <b-field class="has-text-right" label="تاریخ اتمام اجاره">
        <datePicker format="jYYYY-jMM-jDD" v-model="invoice.rent_end"></datePicker>
      </b-field>&nbsp;&nbsp;&nbsp;&nbsp;
      <b-field class="has-text-right" label="مدت اجاره">
        <b-input dir="rtl" type="number" v-model.number="rent_time" rounded required></b-input>
      </b-field>&nbsp;&nbsp;&nbsp;&nbsp;
      <b-field class="has-text-right" label="نام مشتری">
        <b-select
          placeholder="انتخاب مشتری"
          v-model="invoice.user_id"
          icon="account"
          rounded
          required
        >
          <option
            dir="rtl"
            v-for="client in clients"
            :value="client.id"
            :key="client.id"
          >{{ client.name }}</option>
        </b-select>
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field class="has-text-right" label="تسویه" expanded>
        <b-checkbox
          true-value="1"
          false-value="0"
          v-model="invoice.liquidation"
          size="is-medium"
        >تسویه حساب انجام شده</b-checkbox>
      </b-field>
      <b-field class="has-text-right" label="هزینه کل" expanded>
        <b-input dir="rtl" type="number" v-model.number="total" rounded required></b-input>
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field class="has-text-right" label="توضیحات" expanded>
        <b-input dir="rtl" type="textarea" v-model="invoice.description"></b-input>
      </b-field>
      <b-field class="has-text-right" label="آدرس مراسم" expanded>
        <b-input dir="rtl" type="textarea" v-model="invoice.ceremony_address"></b-input>
      </b-field>
    </b-field>

    <div class="has-text-centered">
      <b-button size="is-medium" icon-right="plus" type="is-primary" @click="submit" outlined>ذخیره</b-button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import * as mmj from "moment-jalaali";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import PriceCalculation from "@/components/invoice/PriceCalculation";

export default {
  name: "AddInvoice",
  components: {
    datePicker: VuePersianDatetimePicker,
    PriceCalculation
  },
  computed: {
    ...mapGetters({
      products: "getProducts",
      clients: "getClients",
      invoice: "getInvoice",
      invoiceProducts: "getInvoiceProduct"
    }),
    productList: {
      get: function() {
        let data = [];
        this.invoiceProducts.forEach(el => {
          data.push({
            product: {
              id: el.product_id,
              name: el.name,
              created: el.created,
              updated: el.updated
            },
            fee: el.fee,
            number: el.number,
            price: el.price,
            description: el.description
          });
        });
        return data;
      }
    },
    rent_time: {
      get: function() {
        let end = mmj(this.invoice.rent_end, "jYYYY/jMM/jDD");
        let start = mmj(this.invoice.rent_start, "jYYYY/jMM/jDD");
        this.invoice.rent_period = end.diff(start, "days") || 0;
        return this.invoice.rent_period;
      }
    },
    total: {
      get: function() {
        this.invoice.invoice_amount = 0;
        this.invoice.total_amount = 0;
        this.productList.forEach(el => {
          this.invoice.invoice_amount += el.price;
        });
        this.invoice.total_amount += this.invoice.invoice_amount;
        this.invoice.total_amount += this.invoice.transport_amount;
        this.invoice.total_amount += this.invoice.damage_amount;
        return this.invoice.total_amount;
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("getProducts");
    await this.$store.dispatch("getClients");
    await this.$store.dispatch("getInvoiceProducts", this.invoice.id);
  },
  methods: {
    priceCalculation(fee, number) {
      return parseFloat(fee) * parseFloat(number);
    },
    addToProductList() {
      this.invoiceProducts.push({
        fee: 0,
        price: 0,
        number: 0,
        description: "",
      });
    },
    removeFromProductList(index) {
      this.invoiceProducts.splice(index, 1);
    },
    async submit() {
      // Check if product list is empty
      if (this.invoiceProducts.length < 1) {
        this.$buefy.notification.open({
          message: "محصولی انتخاب نشده است",
          type: "is-danger"
        });
        return;
      }

      let list = []
      this.invoiceProducts.forEach(el => {
        list.push({
          fee: el.fee,
          price: el.price,
          number: el.number,
          description: el.description,
          user_id: this.invoice.user_id,
          product_id: (el.product_id != undefined) ? el.product_id : el.product.id,
          name: (el.name != undefined) ? el.name : el.product.name,
          invoice_id: this.invoice.id,
        })
      })
      
      // Check if invoice is empty
      if (this.invoice.total_amount == 0) {
        this.$buefy.notification.open({
          message: "اطلاعات به درستی وارد نشده‌اند, هزینه کل صفر است",
          type: "is-danger"
        });
        return;
      }

      // Update invoice in database
      await this.$store.dispatch("updateInvoice", {
        invoice: this.invoice,
        productList: list
      });

      this.$buefy.notification.open({
        message: "اطلاعات با موفقیت ذخیره شد",
        type: "is-success"
      });
      setTimeout(() => {
        this.$router.push("/invoices");
      }, 3000);
    }
  }
};
</script>

<style scoped>
.rtld {
  text-align: right;
  direction: rtl;
}
</style>