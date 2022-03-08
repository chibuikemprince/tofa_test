  
const public = require("./static");
const photo = require("./photos/save");



const handlers = {

}


var Photos = new photo()
//console.log("Photos: ",Photos);
 /* 
setInterval(()=>{
    //console.log("DB: ", Photos.DB)
},1000)
 */
handlers.photo = (req,res,callback)=>{

 let actionHandler = req.method.toLowerCase();

 if(actionHandler=="get"){
     
    Photos.get(req,res,callback)
 }
else if(actionHandler=="put"){
     Photos.edit(req)
 .then(myMsg=>{
       
    callback(200,{
    
        "data":  myMsg,
      "header":{"Content-Type":"application/json"}
      
      })

 })
.catch(err=>{
    //console.log(err)
    let  myMsg = err;

    callback(500,{
    
        "data":  {"msg":myMsg},
      "header":{"Content-Type":"application/json"}
      
      })


})



}
else if(actionHandler=="delete"){
      Photos.del(req)
 .then(myMsg=>{
       
    callback(200,{
    
        "data":  myMsg,
      "header":{"Content-Type":"application/json"}
      
      })

 })
.catch(err=>{
    let  myMsg = err;

    callback(500,{
    
        "data":  {"msg":myMsg},
      "header":{"Content-Type":"application/json"}
      
      })


})

}
else{
 callback(401,{
    
    "data":  {"msg":"invalid request"},
  "header":{"Content-Type":"application/json"}
  
  })
    
}

//!="undefined"?checkoutHandlers[req.method.toLowerCase()]:false;
    




}

handlers.start = (req,res,callback)=> {
 Photos.fetch()
 .then(myMsg=>{
       
    callback(200,{
    
        "data":  myMsg,
      "header":{"Content-Type":"application/json"}
      
      })

 })
.catch(err=>{
    let  myMsg = "Fetching data on background";

    callback(500,{
    
        "data":  {"msg":myMsg},
      "header":{"Content-Type":"application/json"}
      
      })


})



}
 




handlers.welcome = (req,res,callback)=> {
callback(200,{
    
    "data":  {"msg":"Welcome"},
  "header":{"Content-Type":"text/plain"}
  
  })


}
 
 

const routes = {
     
    "public":handlers.public,
    "start":handlers.start,
    "photos":handlers.photo
    
}






module.exports=routes;