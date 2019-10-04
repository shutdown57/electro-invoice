<template>
  <section dir="rtl" class="container">
    <form id="single-client">
      <b-field horizontal label="نام و نام خانوادگی">
        <b-input name="subject" v-model="client.name" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="تلفن ثابت">
        <b-input name="subject" v-model="client.phone" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="تلفن همراه">
        <b-input name="subject" v-model="client.mobile" expanded disabled></b-input>
      </b-field>

      <b-field horizontal label="آدرس">
        <b-input type="textarea" v-model="client.address" disabled></b-input>
      </b-field>
    </form>
    <br />
    <b-field>
      <p class="control has-text-centered">
        <button class="button is-medium is-success" @click="print()">چاپ</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-warning" @click="updateClient()">ویرایش</button>
      </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p class="control has-text-centered">
        <button class="button is-medium is-danger" @click="deleteClient()">حذف</button>
      </p>
    </b-field>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SingleClient",
  computed: {
    ...mapGetters({
      client: "getClient"
    })
  },
  methods: {
    updateClient() {
      this.$router.push("/clients/update");
    },
    print() {
      this.$store.dispatch("printOneCustomer", this.client);
    },
    deleteClient() {
      this.$buefy.dialog.confirm({
        title: "حذف مشتری",
        message:
          "توجه کنید با حذف این مشتری فاکتورهایی که این مشتری در آنها بوده است دچار تغییر می‌شود<br>آیا مایل به حذف این مشتری هستید؟",
        confirmText: "حذف مشتری",
        cancelText: "لغو",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch("deleteClient", this.client.id);
          this.$buefy.notification.open({
            message: "مشتری مورد نظر با موفقیت حذف شد",
            type: "is-success"
          });
          setTimeout(() => {
            this.$router.push("/clients");
          }, 3000);
        }
      });
    }
  }
};
</script>