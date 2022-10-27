<template>
  <div>
    <div
      @mousemove="xCoordinate"
      :style="{ backgroundColor: `hsl(${state.x}, 80%, 50%)` }"
      class="movearea"
    >
      <h3>Move your mouse across the screen...</h3>
      <p>x: {{ state.x }}</p>
    </div>
    <div>
      <div>name: {{ state.name }}</div>
      <div>age: {{ state.age }}</div>
      <div>wife: {{ state.wife }}</div>
      <button @click="update">更新一年</button>
    </div>
    <div :class="{ shake: state.bool }">
      <p>Push this button to do something you shouldn't be doing:</p>
      <button class="button" @click="update">click me</button>
      <span v-if="state.bool">Oh no!</span>
      <div>{{ state.bool }}</div>
    </div>
    <div>
      <button @click="state.bool = !state.bool">Toggle</button>

      <transition name="fade">
        <p v-if="state.bool">hello</p>
      </transition>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, reactive } from "vue";
export default {
  setup() {
    const name = ref("Composition Api");
    const showName = () => console.log(`Hello ${name.value}`);
    const state = reactive({
      name: "tony",
      age: 25,
      wife: {
        name: "marry",
        age: 24,
      },
      bool: false,
      x: 0,
    });
    const update = () => {
      state.age++;
      state.wife.age++;
      state.bool = !state.bool;
    };
    const xCoordinate = (e) => {
      state.x = e.clientX;
    };

    onMounted(() => {
      showName();
    });
    return { name, state, update, xCoordinate };
  },
};
</script>
<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
.movearea {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  transition: 0.2s background-color ease;
}
.button {
  background: #1b8f5a;
  /* 应用于初始状态，因此此转换将应用于返回状态 */
  transition: background 0.25s ease-in;
}

.button:hover {
  background: #3eaf7c;
  /* 应用于悬停状态，因此在触发悬停时将应用此过渡 */
  transition: background 0.35s ease-out;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>