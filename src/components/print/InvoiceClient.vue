<template>
  <div>
    <div class="has-text-centered">
    </div>
    <div class="columns">
      <div class="column has-text-right">
        <p class="dir-rtl">شماره فاکتور: {{ info.id }}</p>
        <p class="dir-rtl">نام مشتری: {{ info.name }}</p>
      </div>

      <div class="column column has-text-right">
        <img :src="logo">
      </div>

      <div class="column has-text-right">
        <p class="dir-rtl">تاریخ ثبت: {{ info.created }}</p>
      </div>
    </div>

    <div class="columns">
      <div class="column is-4" v-for="(productList, index) in productsInvoice" :key="index">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th class="has-text-right">محصول</th>
              <th class="has-text-right">فی</th>
              <th class="has-text-right">تعداد</th>
              <th class="has-text-right">قیمت</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productList" :key="index">
              <th>{{ index + 1 }}</th>
              <td class="has-text-right">{{ product.name }}</td>
              <td class="has-text-right">{{ product.fee }}</td>
              <td class="has-text-right">{{ product.number }}</td>
              <td class="has-text-right">{{ product.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="column is-4" v-if="productsInvoice.length > 12">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th class="has-text-right">محصول</th>
              <th class="has-text-right">فی</th>
              <th class="has-text-right">تعداد</th>
              <th class="has-text-right">قیمت</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <th>{{ index + 13 }}</th>
              <td class="has-text-right">{{ product.name }}</td>
              <td class="has-text-right">{{ product.fee }}</td>
              <td class="has-text-right">{{ product.number }}</td>
              <td class="has-text-right">{{ product.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="column is-4" v-if="productsInvoice.length > 24">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th class="has-text-right">محصول</th>
              <th class="has-text-right">فی</th>
              <th class="has-text-right">تعداد</th>
              <th class="has-text-right">قیمت</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <th>{{ index + 1 }}</th>
              <td class="has-text-right">{{ product.name }}</td>
              <td class="has-text-right">{{ product.fee }}</td>
              <td class="has-text-right">{{ product.number }}</td>
              <td class="has-text-right">{{ product.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <br>

    <div class="columns">
      <div class="column">
        <p class="dir-rtl"><strong>هزینه اجناس:</strong> {{ info.invoice_amount }}</p>
        <p class="dir-rtl"><strong>هزینه حمل و نقل:</strong> {{ info.transport_amount }}</p>
        <p class="dir-rtl"><strong>هزینه خسارت:</strong> {{ info.damage_amount }}</p>
        <p class="dir-rtl"><strong>هزینه کل:</strong> {{ info.total_amount }}</p>
        <p class="dir-rtl"><strong>بیعانه:</strong> {{ info.deposit_amount }}</p>
      </div>

      <div class="column">
        <p class="dir-rtl"><strong>تاریخ شروع اجاره:</strong> {{ info.rent_start }}</p>
        <p class="dir-rtl"><strong>تاریخ اتمام اجاره:</strong> {{ info.rent_end }}</p>
        <p class="dir-rtl"><strong>مدت اجاره:</strong> {{ info.rent_period }}</p>
        <p class="dir-rtl"><strong>تسویه حساب:</strong> {{ (info.liquidation == 1) ? 'بله' : 'خیر' }}</p>
        <p class="dir-rtl"><strong>تخفیف:</strong> {{ info.discount }}</p>
      </div>

      <div class="column">
        <p class="dir-rtl"><strong>آدرس مراسم:</strong> {{ info.ceremony_address }}</p>
        <p class="dir-rtl"><strong>توضیحات:</strong> {{ info.description }}</p>
        <p class="dir-rtl"><strong>مبلغ پرداختنی:</strong> {{ info.payable_amount }}</p>
      </div>
    </div>
    
    <div v-if="productsInvoice.length > 3">
      <div class="columns" v-for="(productList, index) in productsInvoice" :key="index">
        <div class="column is-4" v-if="productsInvoice.length > 36">
          <table class="table is-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th class="has-text-right">محصول</th>
                <th class="has-text-right">فی</th>
                <th class="has-text-right">تعداد</th>
                <th class="has-text-right">قیمت</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <th>{{ index + 1 }}</th>
                <td class="has-text-right">{{ product.name }}</td>
                <td class="has-text-right">{{ product.fee }}</td>
                <td class="has-text-right">{{ product.number }}</td>
                <td class="has-text-right">{{ product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="column is-4" v-if="productsInvoice.length > 56">
          <table class="table is-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th class="has-text-right">محصول</th>
                <th class="has-text-right">فی</th>
                <th class="has-text-right">تعداد</th>
                <th class="has-text-right">قیمت</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <th>{{ index + 1 }}</th>
                <td class="has-text-right">{{ product.name }}</td>
                <td class="has-text-right">{{ product.fee }}</td>
                <td class="has-text-right">{{ product.number }}</td>
                <td class="has-text-right">{{ product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="column is-4" v-if="productsInvoice.length > 76">
          <table class="table is-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th class="has-text-right">محصول</th>
                <th class="has-text-right">فی</th>
                <th class="has-text-right">تعداد</th>
                <th class="has-text-right">قیمت</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <th>{{ index + 1 }}</th>
                <td class="has-text-right">{{ product.name }}</td>
                <td class="has-text-right">{{ product.fee }}</td>
                <td class="has-text-right">{{ product.number }}</td>
                <td class="has-text-right">{{ product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import JsPDF from "jspdf"
// import html2canvas from "html2canvas"
import * as logo from "@/assets/ameri.png"

export default {
  name: "InvoiceClient",
  props: ['info', 'products'],
  data() {
    return {
      logo: logo
    }
  },
  computed: {
    productsLength: function () {
      return this.products.length % 12;
    },
    productsInvoice: function () {
      let lists = [];
      let len = this.products.length;

      if ( len > 0 ) {
        lists.push(this.products.slice(0, 12))
      }
      if ( len > 12 ) {
        lists.push(this.products.slice(12, 24))
      } if ( len > 24 ) {
        lists.push(this.products.slice(24, 36))
      }
      if ( len > 36 ) {
        lists.push(this.products.slice(36, 56))
      }
      if ( len > 56 ) {
        lists.push(this.products.slice(56, 76))
      }
      if ( len > 76 ) {
        lists.push(this.products.slice(76, 96))
      }

      return lists;
    }
  }
}
</script>

<style scoped>
@page {
  size: A4;
  margin: 0;
}

@media print {
  html, body {
    width: 210mm;
    height: 297mm;
    font-size: small;
  }
  .dir-rtl {
    direction: rtl !important;
  }
  @page {
    margin: 10mm;
    page-break-before: always;
  }
}
</style>
