<template>
  <section class="is-8 is-centered">
    <b-field class="has-text-right" label="نام و نام خانوادگی">
      <b-input
        dir="rtl"
        type="text"
        pattern="(.*){3,}"
        validation-message="نام و نام خانوادگی مشتری به زبان فارسی"
        v-model="user.name"
        rounded
        required
      ></b-input>
    </b-field>

    <b-field class="has-text-right" label="تلفن ثابت">
      <b-input
        class="rtld"
        pattern="([0-9]){8,}"
        validation-message="شماره باید به صورت 12345678 باشد و یا همراه با پیش شماره شهر باشد"
        v-model="user.phone"
        rounded
        required
      ></b-input>
    </b-field>

    <b-field class="has-text-right" label="تلفن همراه">
      <b-input
        class="rtld"
        pattern="([0-9]){11}"
        validation-message="شماره باید به صورت 09121234567 باشد"
        v-model="user.mobile"
        rounded
      ></b-input>
    </b-field>

    <b-field class="has-text-right" label="آدرس">
      <b-input dir="rtl" pattern="(.*)" validation-message type="textarea" v-bind="user.address"></b-input>
    </b-field>
    <div class="has-text-centered">
      <b-button size="is-medium" icon-right="plus" type="is-primary" @click="submit" outlined>ذخیره</b-button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UpdateClient",
  data() {
    return {
      user: {}
    };
  },
  computed: {
    ...mapGetters({
      client: "getClient"
    })
  },
  async mounted() {
    this.user = await this.client;
  },
  methods: {
    async submit() {
      if (
        this.user.name === "" ||
        this.user.phone === "" ||
        this.user.mobile === ""
      ) {
        this.$buefy.notification.open({
          message: "اطلاعات به درستی وارد نشده‌اند",
          type: "is-danger"
        });
        return;
      }
      // await this.$store.dispatch("updateClient", {
      //   name: this.name,
      //   phone: this.phone,
      //   mobile: this.mobile,
      //   address: this.address
      // });
      this.$buefy.notification.open({
        message: "اطلاعات با موفقیت ذخیره شد",
        type: "is-success"
      });
    },
    persianKeys(evt) {
      if (evt.keyCode == "65") {
        this.name += "ش";
        evt.preventDefault();
      } else if (evt.keyCode == "83") {
        this.name += "س";
        evt.preventDefault();
      } else if (evt.keyCode == "68") {
        this.name += "ی";
        evt.preventDefault();
      } else if (evt.keyCode == "70") {
        this.name += "ب";
        evt.preventDefault();
      } else if (evt.keyCode == "81") {
        this.name += "ض";
        evt.preventDefault();
      } else if (evt.keyCode == "87") {
        this.name += "ص";
        evt.preventDefault();
      } else if (evt.keyCode == "69") {
        this.name += "ث";
        evt.preventDefault();
      } else if (evt.keyCode == "82") {
        this.name += "ق";
        evt.preventDefault();
      } else if (evt.keyCode == "84") {
        this.name += "ف";
        evt.preventDefault();
      } else if (evt.keyCode == "71") {
        this.name += "ل";
        evt.preventDefault();
      } else if (evt.keyCode == "90") {
        this.name += "ظ";
        evt.preventDefault();
      } else if (evt.keyCode == "88") {
        this.name += "ط";
        evt.preventDefault();
      } else if (evt.keyCode == "67" && evt.shiftKey == false) {
        this.name += "ز";
        evt.preventDefault();
      } else if (evt.keyCode == "86") {
        this.name += "ر";
        evt.preventDefault();
      } else if (evt.keyCode == "67" && evt.shiftKey == true) {
        this.name += "ژ";
        evt.preventDefault();
      } else if (evt.keyCode == "66") {
        this.name += "ذ";
        evt.preventDefault();
      } else if (evt.keyCode == "78") {
        this.name += "د";
        evt.preventDefault();
      } else if (evt.keyCode == "72" && evt.shiftKey == false) {
        this.name += "ا";
        evt.preventDefault();
      } else if (evt.keyCode == "72" && evt.shiftKey == true) {
        this.name += "آ";
        evt.preventDefault();
      } else if (evt.keyCode == "89") {
        this.name += "غ";
        evt.preventDefault();
      } else if (evt.keyCode == "85") {
        this.name += "ع";
        evt.preventDefault();
      } else if (evt.keyCode == "74") {
        this.name += "ت";
        evt.preventDefault();
      } else if (evt.keyCode == "77") {
        this.name += "پ";
        evt.preventDefault();
      } else if (evt.keyCode == "73") {
        this.name += "ه";
        evt.preventDefault();
      } else if (evt.keyCode == "75") {
        this.name += "ن";
        evt.preventDefault();
      } else if (evt.keyCode == "188") {
        this.name += "و";
        evt.preventDefault();
      } else if (evt.keyCode == "79") {
        this.name += "خ";
        evt.preventDefault();
      } else if (evt.keyCode == "80") {
        this.name += "ح";
        evt.preventDefault();
      } else if (evt.keyCode == "186") {
        this.name += "ک";
        evt.preventDefault();
      } else if (evt.keyCode == "222") {
        this.name += "گ";
        evt.preventDefault();
      } else if (evt.keyCode == "219") {
        this.name += "ج";
        evt.preventDefault();
      } else if (evt.keyCode == "221") {
        this.name += "چ";
        evt.preventDefault();
      } else if (evt.keyCode == "76") {
        this.name += "م";
        evt.preventDefault();
      }
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