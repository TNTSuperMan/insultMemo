import {save} from "/script/save.js";
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
            
            editvar:{
                name:0,
                nick:0,
                insult:[],
                setting:[]
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
                app.nowi=i;
                svo();
            },
            expdat:e=>{
                svo();
                let c = localStorage.getItem("imlogin");
                let blob = new Blob([c],{"type" : "text/plain"});
                app.expblob = URL.createObjectURL(blob);
                document.getElementById("dl").click();
            },
            svovue:e=>svo()
        }
    });
}
function svo(){
    save(app.save);
}