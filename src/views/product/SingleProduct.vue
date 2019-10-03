<template>
  <section dir="rtl" class="container">
    <form id="single-product">
      <b-field horizontal label="نام محصول">
        <b-input name="subject" v-model="product.name" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="تاریخ ایجاد">
        <b-input name="subject" v-model="product.created" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="تاریخ ویرایش">
        <b-input name="subject" v-model="product.updated" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="توضیحات">
        <b-input type="textarea" v-model="product.description" disabled></b-input>
      </b-field>
    </form>
    <br />
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">چاپ</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-warning" @click="updateProduct()">ویرایش</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-danger">حذف</button>
      </p>
    </b-field>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SingleProduct",
  computed: {
    ...mapGetters({
      product: "getProduct"
    })
  },
  methods: {
    updateProduct() {
        this.$store.dispatch("addCurrentProduct", this.product);
      this.$router.push("/products/update");
    },
    print() {
      this.$store.dispatch("printOneProduct", this.product);
    }
  }
};
</script>