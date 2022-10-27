<script setup>
import { ref, onMounted, reactive } from "vue";

// 响应式状态
const count = ref(0);
const state = reactive({
  count: 0,
});

function increment() {
  count.value++;
  state.count++;
}

onMounted(() => {
  console.log("origin count is:", count.value);
});
</script>
<template>
  <div>
    <h3>组合式API（Composition API）</h3>
    <button @click="increment">点击</button>
    <div>Count is: {{ count }}</div>
    <div>state Count is: {{ state.count }}</div>
  </div>
</template>