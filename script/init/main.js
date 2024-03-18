import {initVue} from "../init/vue.js";
import {setpwd, save} from "../save.js";

export function init(){
    let imdata = localStorage.getItem("imlogin");
    let encdata = "";
    if(!imdata){
        encdata = first();
    }else{
        encdata = decData(imdata);
    }
    if(!encdata) return;
    initVue(encdata);
}
function first(a){
    let pass = prompt("ようこそ悪口メモへ。まず使用するパスワードを入力してください。")
    setpwd(pass);
    save([]);
    return [];
}
function decData(imd){
    //let pass = prompt("パスワードを入力してください");
    let pass = "a";
    setpwd(pass);
    try{
        let enc = CryptoJS.AES.decrypt(imd,pass).toString(CryptoJS.enc.Utf8);
        return JSON.parse(enc);
    }catch(e){
        alert("パスワードが違います。再読み込みして試してください。");
    }
}