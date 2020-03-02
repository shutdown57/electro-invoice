<template>
  <section class="container">
    <b-field class="has-text-right" label="نام محصول">
      <b-input
        dir="rtl"
        type="text"
        v-model="newProduct.name"
        rounded
        required
      ></b-input>
    </b-field>

    <b-field class="has-text-right" label="قیمت">
      <b-input type="number" v-model="newProduct.price" rounded></b-input>
    </b-field>

    <b-field class="has-text-right" label="توضیحات">
      <b-input
        dir="rtl"
        type="textarea"
        v-model="newProduct.description"
      ></b-input>
    </b-field>

    <div class="has-text-centered">
      <b-button
        size="is-medium"
        icon-right="plus"
        type="is-primary"
        @click="submit"
        outlined
      >
        ذخیره
      </b-button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AddProduct",
  data() {
    return {
      newProduct: {}
    };
  },
  computed: {
    ...mapGetters({
      clients: "getClients"
    })
  },
  methods: {
    async submit() {
      if (this.newProduct.name === "") {
        this.$buefy.notification.open({
          message: "اطلاعات به درستی وارد نشده‌اند",
          type: "is-danger"
        });
        return false;
      }
      await this.$store.dispatch("insertProduct", {
        name: this.newProduct.name,
        price: this.newProduct.price,
        description: this.newProduct.description
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

