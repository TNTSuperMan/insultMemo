<script setup>
import { ref, inject } from "vue"
import Import from "./import"
const pass = ref("")
const repass = ref("")
const err = ref("")
const data = inject("data")
const thispass = inject("pass")
const path = inject("path")
const save = inject("save")
function init(){
    err.value = ""
    if(pass.value == ""){
        err.value = "パスワードが空です"
    }else if(pass.value != repass.value){
        err.value = "新しいパスワードと再入力したパスワードが一致しません"
    }else{
        data.value = []
        save()
        thispass.value = pass.value
        path.value = "home"
    }
}
</script>
<template>
    <div class="root">
        <h2>悪口メモをセットアップ</h2>
        <p>ようこそ悪口メモへ！こちらは人物ごとに悪口等を分けて、パスワードで暗号化してブラウザに保存できます！以下にパスワードを入力して悪口メモを始めましょう！</p>
        <p class="err">{{ err }}</p>
        <label>新しいパスワード:<input type="password" v-model="pass"></label><br>
        <label>パスワードを再入力:<input type="password" v-model="repass"></label><br>
        <button @click="init()">始める</button>
        <button @click="Import">インポート</button>
    </div>
</template>
<style scoped>
.err{
    color:red;
}
.root{
    text-align:center;
}
p:not(.err){
    word-break: break-all;
    width:min(50%,500px);
    position:relative;
    left:calc((100% - min(50%,500px)) / 2);
}
</style>