<script setup>
import { provide, ref } from "vue"
import Check from "./Check.vue"
import Subsc from "./Subscribe.vue"
import Home from "./Home.vue"
const path = ref("")
provide("data", ref([]))
provide("pass", ref(""))
provide("path",path)
if(window.localStorage.getItem("im")){
    path.value = "check"
}else{
    path.value = "subsc"
}
const router = {
    "check": Check,
    "subsc": Subsc,
    "home": Home
}
</script>
<template>
    <component :is="router[path] || Check" />
</template>
<style scoped>
</style>
