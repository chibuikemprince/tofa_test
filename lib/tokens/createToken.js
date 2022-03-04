const create  = require("../io/create");

const createToken = (filename,data,callback)=>{

create(".tokens",filename,data,(err)=>{
if(!err){

callback(false)


}else{

callback("Token creation failed ")
console.log(err)
}

})




}

module.exports=createToken;