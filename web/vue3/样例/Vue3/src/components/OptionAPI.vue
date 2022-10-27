<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  mounted() {
    console.log("origin count is ", this.count);
  },
};
</script>
<template>
  <div>
    <h3>选项式API（Option API）</h3>
    <button @click="increment">Count is: {{ count }}</button>
  </div>
</template>
