const userHandlers = require("./users/userHandlers")
const tokenHandlers = require("./tokens/tokenHandlers")
const createOrder = require("./users/actions/createOrder")
const cancelOrder = require("./users/actions/cancelOrder")
const checkoutHandlers = require("./users/actions/checkout")
const public = require("./static");
//const photo = require("./photos/save");

const handlers = {

}


handlers.welcome = (req,res,callback)=> {
callback(200,{
    
    "data":  {"msg":"Welcome"},
  "header":{"Content-Type":"text/plain"}
  
  })


}

handlers.createOrder=createOrder;
handlers.cancelOrder = cancelOrder;
handlers.public = public;


handlers.checkout = (req,res,callback)=> {
    // console.log("UserH: "+userHandlers)
    
    var checkoutHandleForReqMethod = typeof(checkoutHandlers[req.method.toLowerCase()])!="undefined"?checkoutHandlers[req.method.toLowerCase()]:false;
    
    if(checkoutHandleForReqMethod){
    
    
        checkoutHandleForReqMethod(req,res,(status,data)=>{
    
        callback(status,data)
    
    })
    
    
    
    
    }else{
        callback(500,{
            
            "data":  {"error":req.method+" is not allowed on this route"},
          "header":{"Content-Type":"application/json"}
          
          })
    }
    
    
        
        
        
        }
        



handlers.tokens = (req,res,callback)=> {
    // console.log("UserH: "+userHandlers)
    
    var tokenHandleForReqMethod = typeof(tokenHandlers[req.method.toLowerCase()])!="undefined"?tokenHandlers[req.method.toLowerCase()]:false;
    
    if(tokenHandleForReqMethod){
    
    
        tokenHandleForReqMethod(req,res,(status,data)=>{
    
        callback(status,data)
    
    })
    
    
    
    
    }else{
        callback(500,{
            
            "data":  {"error":req.method+" is not allowed on this route"},
          "header":{"Content-Type":"application/json"}
          
          })
    }
    
    
        
        
        
        }
        
    

handlers.user = (req,res,callback)=> {
    // console.log("UserH: "+userHandlers)
    
    var userHandleForReqMethod = typeof(userHandlers[req.method.toLowerCase()])!="undefined"?userHandlers[req.method.toLowerCase()]:false;
    
    if(userHandleForReqMethod){
    
    
    userHandleForReqMethod(req,res,(status,data)=>{
    
        callback(status,data)
    
    })
    
    
    
    
    }else{
        callback(500,{
            
            "data":  {"error":req.method+" is not allowed on this route"},
          "header":{"Content-Type":"application/json"}
          
          })
    }
    
    
        
        
        
        }
        
            





const routes = {
    "index":handlers.welcome,
    "user":handlers.user,
    "tokens":handlers.tokens,
    "createorder":handlers.createOrder,
    "cancelorder":handlers.cancelOrder,
    "checkout":handlers.checkout,
    "public":handlers.public
    
}






module.exports=routes;