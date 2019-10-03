<template>
      <b-input type="number" :value="priceCalculation()" :disabled=isDisabled></b-input>
</template>

<script>
export default {
  name: "PriceCalculation",
  props: ["fee", "number", "disabled"],
  data() {
    return {
      price: 0
    }
  },
  computed: {
    isDisabled() {
      return this.$props.disabled || false
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