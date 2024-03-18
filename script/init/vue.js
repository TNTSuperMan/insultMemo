import {save} from "../save.js";
let app;
export function initVue(savedata){
    document.querySelector("#app").style.display="block"
    app = new Vue({
        el:"#app",
        data:{
            //save:savedata,
            save:savedata,
            scrflag:{
                home:true,
                usr:false,
                edit:false,
                desc:true
            },
            inp:{
                nick:null,
                name:null,
                insult:null,
                setting:null,
            },
            nowi:null,
            nusrd:{name:0,nick:0,insult:[],setting:[]},
            expblob:null,
            tweet:{
                whofor:null,
                isInsult:"true",
                content:null,
                msg:null
            }
        },methods:{
            showusr:i=>{
                app.scrflag.home = false;
                app.scrflag.usr = true;
                app.scrflag.edit = false
                app.nusrd = app.save[i];
                app.nowi=i;
            },
            tohome:e=>{
                app.scrflag.home = true;
                app.scrflag.usr = false;
                app.scrflag.edit = false
            },
            addusr:e=>{
                app.save.push({
                    name:app.inp.name,
                    nick:app.inp.nick,
                    insult:[],
                    setting:[]
                });
                app.inp.name = null;
                app.inp.nick = null;
                svo()
            },
            showedit:e=>{
                app.scrflag.home = false;
                app.scrflag.usr = false;
                app.scrflag.edit = true
                
            },
            delusr:e=>{
                if(confirm("本当に？")){
                    
                    app.save.splice(app.nowi,1);
                
                    app.scrflag.home = true;
                    app.scrflag.usr = false;
                    app.scrflag.edit = false
                    svo()
                }
            },
            Edelinsult:e=>{
                app.nusrd.insult.splice(e,1);
            },
            Eaddinsult:e=>{
                app.nusrd.insult.push(app.inp.insult);
                app.inp.insult = null;
            },
            Edelsetting:e=>{
                app.nusrd.setting.splice(e,1);
            },
            Eaddsetting:e=>{
                app.nusrd.setting.push(app.inp.setting);
                app.inp.setting = null;
            },
            savenus:e=>{
                app.save[app.nowi] = app.nusrd;
                app.scrflag.home = false;
                app.scrflag.usr = true;
                app.scrflag.edit = false
                app.nusrd = app.save[app.nowi];
                app.nowi=e;
                svo();
            },
            expdat:e=>{
                svo();
                //if(app.expblob) URL.revokeObjectURL(app.expblob);
                let c = localStorage.getItem("imlogin");
                let blob = new Blob([c],{"type" : "text/plain"});
                app.expblob = URL.createObjectURL(blob);
                document.getElementById("dl").click();
            },
            svovue:e=>svo(),
            twt:e=>{
                app.tweet.msg = "";
                if(app.tweet.whofor == null){
                    app.tweet.msg = "宛先を入力してください。";
                    setTimeout(e=>app.tweet.msg="",2000);
                    return;
                }
                app.save.forEach(h=>{
                    if(h.name == app.tweet.whofor){
                        (app.tweet.isInsult == "true" ? h.insult : h.setting).push(app.tweet.content)
                        svo();
                        app.tweet.msg = "成功しました。";
                        app.tweet.whofor = null;
                        app.tweet.isInsult = "true";
                        app.tweet.content = "";
                        setTimeout(e=>app.tweet.msg="",2000);
                    }
                })
            }
        }
    });
}
function svo(){
    save(app.save);
}