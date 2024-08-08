<script setup>
import { ref, inject } from "vue"
const pass = ref("")
const repass = ref("")
const err = ref("")
const data = inject("data")
const thispass = inject("pass")
const path = inject("path")
function init(){
    err.value = ""
    if(pass.value == ""){
        err.value = "パスワードが空です"
    }else if(pass.value != repass.value){
        err.value = "新しいパスワードと再入力したパスワードが一致しません"
    }
    data.value = []
    thispass.value = pass.value
    path.value = "home"
}
</script>
<template>
    <h2>悪口メモをセットアップ</h2>
    <p>ようこそ悪口メモへ！<br>
       こちらは人物ごとに悪口等を分けて、パスワードで暗号化してブラウザに保存できます！<br>
       以下にパスワードを入力して悪口メモを始めましょう！</p>
    <p class="err">{{ err }}</p>
    <table>
        <tr><td>新しいパスワード:</td><td><input type="password" v-model="pass"></td></tr>
        <tr><td>パスワードを再入力:</td><td><input type="password" v-model="repass"></td></tr>
    </table>
    <button @click="init()">始める</button>
</template>
<style scoped>
.err{
    color:red;
}
</style>