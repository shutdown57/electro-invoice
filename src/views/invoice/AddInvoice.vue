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
          <tr v-for="(singleProduct, index) in productList" :key="index">
            <th>{{ index + 1 }}</th>
            <td>
              <b-select
                placeholder="Customer"
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
                  <b-icon icon="close"></b-icon>
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
        <b-input dir="rtl" type="number" v-model.number="newInvoice.damage_amount" rounded required></b-input>
      </b-field>
      <b-field class="has-text-right" label="هزینه حمل و نقل" expanded>
        <b-input
          dir="rtl"
          type="number"
          v-model.number="newInvoice.transport_amount"
          rounded
          required
        ></b-input>
      </b-field>
      <b-field class="has-text-right" label="هزینه اجناس" expanded>
        <b-input
          dir="rtl"
          type="number"
          v-model.number="newInvoice.invoice_amount"
          rounded
          required
        ></b-input>
      </b-field>
    </b-field>

    <b-field class="rtld" grouped>
      <b-field class="has-text-right" label="تاریخ شروع اجاره">
        <datePicker format="jYYYY-jMM-jDD" v-model="newInvoice.rent_start"></datePicker>
      </b-field>
      <b-field class="has-text-right" label="تاریخ اتمام اجاره">
        <datePicker format="jYYYY-jMM-jDD" v-model="newInvoice.rent_end"></datePicker>
      </b-field>&nbsp;&nbsp;&nbsp;&nbsp;
      <b-field class="has-text-right" label="مدت اجاره">
        <b-input dir="rtl" type="number" v-model.number="rent_time" rounded required></b-input>
      </b-field>&nbsp;&nbsp;&nbsp;&nbsp;
      <b-field class="has-text-right" label="نام مشتری">
        <b-select
          placeholder="انتخاب مشتری"
          v-model="newInvoice.user_id"
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
          v-model="newInvoice.liquidation"
          size="is-medium"
        >تسویه حساب انجام شده</b-checkbox>
      </b-field>
      <b-field class="has-text-right" label="هزینه کل" expanded>
        <b-input dir="rtl" type="number" v-model.number="total" rounded required></b-input>
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field class="has-text-right" label="تخفیف" expanded>
        <b-input dir="rtl" type="number" v-model.number="newInvoice.discount" rounded></b-input>
      </b-field>

      <b-field class="has-text-right" label="بیعانه" expanded>
        <b-input dir="rtl" type="number" v-model.number="newInvoice.deposit_amount" rounded></b-input>
      </b-field>

      <b-field class="has-text-right" label="مبلغ پرداختنی" expanded required>
        <b-input dir="rtl" type="number" v-model.number="payable" rounded></b-input>
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field class="has-text-right" label="توضیحات" expanded>
        <b-input dir="rtl" type="textarea" v-model="newInvoice.description"></b-input>
      </b-field>
      <b-field class="has-text-right" label="آدرس مراسم" expanded>
        <b-input dir="rtl" type="textarea" v-model="newInvoice.ceremony_address"></b-input>
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
  data() {
    return {
      newInvoice: {
        total_amount: 0,
        description: "",
        ceremony_address: "",
        liquidation: 0,
        invoice_amount: 0,
        transport_amount: 0,
        damage_amount: 0,
        discount: 0,
        payable_amount: 0,
        deposit_amount: 0,
        rent_end: "",
        rent_start: "",
        rent_period: 0,
        user_id: null
      },
      productList: [
        {
          product: {},
          fee: 0,
          price: 0,
          number: 0,
          description: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      products: "getProducts",
      clients: "getClients",
      invoice: "getInvoice"
    }),
    rent_time: {
      get: function() {
        let end = mmj(this.newInvoice.rent_end, "jYYYY/jMM/jDD");
        let start = mmj(this.newInvoice.rent_start, "jYYYY/jMM/jDD");
        this.newInvoice.rent_period = end.diff(start, "days") || 0;
        return this.newInvoice.rent_period;
      }
    },
    total: {
      get: function() {
        this.newInvoice.invoice_amount = 0;
        this.newInvoice.total_amount = 0;
        this.productList.forEach(el => {
          this.newInvoice.invoice_amount += el.price;
        });
        this.newInvoice.total_amount += this.newInvoice.invoice_amount;
        this.newInvoice.total_amount += this.newInvoice.transport_amount;
        this.newInvoice.total_amount += this.newInvoice.damage_amount;
        return this.newInvoice.total_amount;
      }
    },
    payable: {
      get: function() {
        this.newInvoice.payable_amount = 0;
        this.newInvoice.payable_amount =
          this.newInvoice.total_amount - this.newInvoice.discount;
        this.newInvoice.payable_amount -= this.newInvoice.deposit_amount;
        return this.newInvoice.payable_amount;
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("getProducts"),
      await this.$store.dispatch("getClients");
    await this.$store.dispatch("lastInvoiceId");
  },
  methods: {
    priceCalculation(fee, number) {
      return parseFloat(fee) * parseFloat(number);
    },
    addToProductList() {
      this.productList.push({
        fee: 0,
        price: 0,
        number: 0,
        description: ""
      });
    },
    removeFromProductList(index) {
      this.productList.splice(index, 1);
    },
    async submit() {
      // Check if product list is empty
      if (!this.productList[0].product.id) {
        this.$buefy.notification.open({
          message: "محصولی انتخاب نشده است",
          type: "is-danger"
        });
        return;
      }

      // Check if invoice is empty
      if (this.newInvoice.total_amount == 0) {
        this.$buefy.notification.open({
          message: "اطلاعات به درستی وارد نشده‌اند, هزینه کل صفر است",
          type: "is-danger"
        });
        return;
      }

      // Insert invoice in database
      await this.$store.dispatch("insertInvoice", {
        total_amount: this.newInvoice.total_amount,
        description: this.newInvoice.description,
        ceremony_address: this.newInvoice.ceremony_address,
        liquidation: this.newInvoice.liquidation,
        invoice_amount: this.newInvoice.invoice_amount,
        transport_amount: this.newInvoice.transport_amount,
        damage_amount: this.newInvoice.damage_amount,
        rent_end: this.newInvoice.rent_end,
        rent_start: this.newInvoice.rent_start,
        rent_period: this.newInvoice.rent_period,
        payable_amount: this.newInvoice.payable_amount,
        discount: this.newInvoice.discount,
        deposit_amount: this.newInvoice.deposit_amount,
        user_id: this.newInvoice.user_id
      });

      // Get latest invoice id
      let latestInvoiceId = this.invoice[0].id ? this.invoice[0].id + 1 : 1;

      // Insert product and invoice info in database
      this.$store.dispatch("insertInvoiceProduct", {
        productList: this.productList,
        latestInvoiceId,
        user_id: this.newInvoice.user_id
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