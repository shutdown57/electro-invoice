<template>
  <section dir="rtl" class="container">
    <form id="single-product">
      <b-field horizontal label="نام محصول">
        <b-input
          name="subject"
          v-model="product.name"
          expanded
          disabled
        ></b-input>
      </b-field>

      <b-field horizontal label="قیمت محصول">
        <b-input
          name="subject"
          v-model="product.price"
          expanded
          disabled
        ></b-input>
      </b-field>

      <b-field horizontal label="تاریخ ایجاد">
        <b-input
          name="subject"
          v-model="product.created"
          expanded
          disabled
        ></b-input>
      </b-field>

      <b-field horizontal label="تاریخ ویرایش">
        <b-input
          name="subject"
          v-model="product.updated"
          expanded
          disabled
        ></b-input>
      </b-field>

      <b-field horizontal label="توضیحات">
        <b-input
          type="textarea"
          v-model="product.description"
          disabled
        ></b-input>
      </b-field>
    </form>
    <br />
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">
          چاپ
        </button>
      </p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-warning" @click="updateProduct()">
          ویرایش
        </button>
      </p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-danger" @click="deleteProduct()">
          حذف
        </button>
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
    },
    deleteProduct() {
      this.$buefy.dialog.confirm({
        title: "حذف محصول",
        message:
          "توجه کنید با حذف این محصول فاکتورهایی که این محصول در آنها بوده است دچار تغییر می‌شود<br>آیا مایل به حذف این محصول هستید؟",
        confirmText: "حذف محصول",
        cancelText: "لغو",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch("deleteProduct", this.product.id);
          this.$buefy.notification.open({
            message: "محصول مورد نظر با موفقیت حذف شد",
            type: "is-success"
          });
          setTimeout(() => {
            this.$router.push("/products");
          }, 3000);
        }
      });
    }
  }
};
</script>
