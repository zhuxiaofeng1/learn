
<template>
    <div></div>
</template><script>
import {ref, onMounted} from "vue"
export default {
    setup() {
        let msg = ref("hello vue3 in VueCompositionTwo");
        function showMsg() {
            console.log(msg.value);
        }
        onMounted(() => {
            showMsg();
        })
        return {msg, showMsg}
    }
}
</script>