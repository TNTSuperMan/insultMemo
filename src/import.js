export default function (){
    if(window.showOpenFilePicker){
        return window.showOpenFilePicker({
            types: [
                {
                    description:"ファイル"
                }
            ],
            multiple: false
        }).then(e=>e[0].getFile())
        .then(e=>e.text())
    }else{
        return new Promise(res=>res())
    }
}