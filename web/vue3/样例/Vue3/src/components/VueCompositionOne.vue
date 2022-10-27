<template>
    <div></div>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
    setup() {
        const name = ref("Composition Api in VueCompositionOne");
        const showName = () => console.log(`Hello ${name.value}`)
        const status = ref(false);
        const toggle = () => status.value = true;

        onMounted(() => {
            showName();
        })
        return {name, status, toggle}
    }
}
</script>