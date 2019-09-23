<template>
      <b-input type="number" :value="priceCalculation()"></b-input>
</template>

<script>
export default {
  name: "PriceCalculation",
  props: ["fee", "number"],
  data() {
    return {
      price: 0
    }
  },
  methods: {
    priceCalculation: function () {
      this.price = parseFloat(this.$props.fee) * parseFloat(this.$props.number)
      this.$emit('rowPrice', this.price)
      return this.price
    }
  }
};
</script>