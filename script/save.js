let pwd;
export function setpwd(pass){
    pwd = pass;
}
export function save(data){
    localStorage.setItem("imlogin",
        CryptoJS.AES.encrypt(
            JSON.stringify(data),
            pwd).toString());
}