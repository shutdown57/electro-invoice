<template>
  <section class="container">
    <b-field grouped>
      <table class="table">
        <thead>
          <tr>
            <th>
              <abbr title="Position">PId</abbr>
            </th>
            <th>Product</th>
            <th>
              <abbr title="Played">Fee</abbr>
            </th>
            <th>
              <abbr title="Drawn">Numbser</abbr>
            </th>
            <th>
              <abbr title="Won">Price</abbr>
            </th>
            <th>
              <abbr title="Lost">Description</abbr>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>
              <abbr title="Position">PId</abbr>
            </th>
            <th>Product</th>
            <th>
              <abbr title="Won">Fee</abbr>
            </th>
            <th>
              <abbr title="Lost">Number</abbr>
            </th>
            <th>
              <abbr title="Drawn">Price</abbr>
            </th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="(singleProduct, index) in productList" :key="index">
            <th>{{ index + 1 }}</th>
            <td>
              <b-select
                placeholder="Customer"
                icon="account"
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
              <button @click="removeFromProductList(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-field>

    <button @click="addToProductList">Add row</button>
    <hr />

    <b-field grouped>
      <b-field class="has-text-right" label="هزینه خسارت" expanded>
        <b-input
          dir="rtl"
          type="number"
          pattern="(.*){3,}"
          validation-message="نام و نام خانوادگی مشتری به زبان فارسی"
          v-model="newInvoice.damage_amount"
          rounded
          required
        ></b-input>
      </b-field>
      <b-field class="has-text-right" label="هزینه حمل و نقل" expanded>
        <b-input
          dir="rtl"
          type="number"
          pattern="(.*){3,}"
          validation-message="نام و نام خانوادگی مشتری به زبان فارسی"
          v-model="newInvoice.transport_amount"
          rounded
          required
        ></b-input>
      </b-field>
      <b-field class="has-text-right" label="هزینه اجناس" expanded>
        <b-input
          dir="rtl"
          type="number"
          pattern="(.*){3,}"
          validation-message="نام و نام خانوادگی مشتری به زبان فارسی"
          v-model="newInvoice.invoice_amount"
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
        <b-input
          dir="rtl"
          type="number"
          pattern="(.*){3,}"
          validation-message="نام و نام خانوادگی مشتری به زبان فارسی"
          v-model="rent_time"
          rounded
          required
        ></b-input>
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
        <b-input
          dir="rtl"
          type="number"
          pattern="(.*){3,}"
          validation-message="نام و نام خانوادگی مشتری به زبان فارسی"
          v-model="newInvoice.total_amount"
          rounded
          required
        ></b-input>
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
// FIXME: validation message

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
        rent_end: "",
        rent_start: "",
        rent_period: 0
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
      products: "getProducts"
    }),
    rent_time: {
      get: function() {
        let end = mmj(this.newInvoice.rent_end, "jYYYY/jMM/jDD");
        let start = mmj(this.newInvoice.rent_start, "jYYYY/jMM/jDD");
        return end.diff(start, "days") || 0;
      }
    }
  },
  mounted() {
    this.$store.dispatch("getProducts");
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
      if (this.newInvoice.name === "") {
        this.$buefy.notification.open({
          message: "اطلاعات به درستی وارد نشده‌اند",
          type: "is-danger"
        });
        return false;
      }
      //   await this.$store.dispatch("insertProduct", {
      //     name: this.newInvoice.name,
      //     description: this.newInvoice.description
      //   });
      this.$buefy.notification.open({
        message: "اطلاعات با موفقیت ذخیره شد",
        type: "is-success"
      });
      setTimeout(() => {
        this.$router.push("/products");
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