
const fs = require("fs");
const helpers = require("../helpers");
const path = require("path")
var baseDir = path.join(__dirname,"../../files");

const tokenAuth = (tokenid,email,callback)=>{

fs.readFile(baseDir+"/.tokens/"+tokenid+".json","utf-8",(err,data)=>{

if(!err && data){
var JsonData = helpers.strToJson(data)

if(JsonData.email ==email){

var today = Date.now()
if(JsonData.expires>today){
    callback(false)
    //console.log(JsonData.expires)

// console.log(today)

}else{
    callback("Token expired")
}


}else{

    callback("Please login to your account")
    console.log("email not matched")
}


}else{
    callback("Login token not found, Please Login to your account")
    console.log(err)
}

})



}


module.exports=tokenAuth;