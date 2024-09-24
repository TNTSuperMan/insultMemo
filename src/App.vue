<script setup>
import { provide, ref } from "vue"
import { AES } from "crypto-js"
import Check from "./Auth.vue"
import Subsc from "./Subscribe.vue"
import Home from "./Home.vue"
const path = ref("")
const data = ref([])
const pass = ref("")
provide("save", ()=>{
    let json = JSON.stringify(data.value)
    let enc = AES.encrypt(json, pass.value)
    window.localStorage.setItem("im", enc)
})
provide("data", data)
provide("pass", pass)
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
