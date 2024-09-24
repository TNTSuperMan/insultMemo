<script setup>
import { inject, ref } from 'vue';
import Import from "./import"
import { AES } from "crypto-js"

const pass = inject("pass")
const err = ref("")
function start(){
    err.value = ""
    if(pass.value == ""){
        err.value = "パスワードが空です"
    }else{
        try{
            let enc = AES.decrypt(localStorage.getItem("im"),pass.value)
            inject("data").value = enc
            inject("path").value = "home"
        }
        catch{
            err.value = "パスワードが違います"
        }
    }
}
function del(){
    if(confirm("本当に消しますか？")){
        localStorage.removeItem("im")
        window.location.reload()
    }
}
</script>
<template>
    <div class="root">
        <h2>認証</h2>
        <p class="err">{{ err }}</p>
        <label>パスワード:<input type="password" v-model="pass"></label>
        <button @click="start()">始める</button>
        <button @click="del()">削除</button>
        <button @click="Import">インポート</button>
    </div>
</template>
<style scoped>
.err{
    color:red;
}
.root{
    display:flex;
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    align-items:center;
    justify-content: center;
    text-align:center;
}
.root *{
    display:block;
}
p:not(.err){
    word-break: break-all;
    width:min(50%,500px);
    position:relative;
    left:calc((100% - min(50%,500px)) / 2);
}
</style>