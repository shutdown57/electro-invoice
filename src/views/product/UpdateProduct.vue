<template>
  <section class="container">
    <b-field class="has-text-right" label="نام محصول">
      <b-input
        dir="rtl"
        type="text"
        pattern="(.*){3,}"
        validation-message="نام و نام خانوادگی مشتری به زبان فارسی"
        v-model="product.name"
        rounded
        required
      ></b-input>
    </b-field>

    <b-field class="has-text-right" label="توضیحات">
      <b-input dir="rtl" type="textarea" v-model="product.description"></b-input>
    </b-field>
    <div class="has-text-centered">
      <b-button size="is-medium" icon-right="plus" type="is-primary" @click="submit" outlined>ذخیره</b-button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UpdateProduct",
  data() {
    return {
      product: {}
    };
  },
  async mounted() {
      this.product = this.oneProduct
  },
  computed: {
    ...mapGetters({
      oneProduct: "getProduct"
    })
  },
  methods: {
    async submit() {
      if (this.product.name === "") {
        this.$buefy.notification.open({
          message: "اطلاعات به درستی وارد نشده‌اند",
          type: "is-danger"
        });
        return false;
      }
      await this.$store.dispatch("updateProduct", {
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        created: this.product.created
      });
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