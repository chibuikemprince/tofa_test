const tokenAuth = require("../../Auth/tokenAuth");
const helpers = require("../../helpers");
// const update = require("../io/update");
const fs = require("fs")
const path = require("path");
const IO = require("../../io/all")
const products = require("../../../produts");

var baseDir = path.join(__dirname,"../../../files");


var cancelOrder =(req,res,callback)=>{

    
    var userData = req.reqObject.data;
    var userHeaders = req.reqObject.headers;


    if(req.method.toLowerCase()=="put"){

    if(userData && userHeaders){

        var email = typeof(userData.email)=="string" && userData.email.length>0 && helpers.validEmail(userData.email)?userData.email:false;
        var tokenId = typeof(userHeaders.tokenid)=="string" && userHeaders.tokenid.length==64?userHeaders.tokenid:false;
        if(email && tokenId){
tokenAuth(tokenId,email,(Notauthentic)=>{
if(!Notauthentic){
    var orderIdToCancel = typeof(userData.orderId)== "string" ?userData.orderId:false;
    


    if( orderIdToCancel )
{
 
    var today = Date.now()
//var orderId = helpers.hash(email+today)
 
    
        
        fs.readFile(baseDir+"/.orders/pending/"+email+".json","utf-8",(err,data)=>{
        if(!err && data){
        //update orderfile

var orderInJson = helpers.strToJson(data);
var all_order_array = orderInJson.orders
 var leftOrder = [];
 var orderId_found = false
 //ensure that the all_order_array is not an empty array
 if( (all_order_array instanceof Array) && all_order_array.length>0){
    // console.log(all_order_array instanceof Array)
    all_order_array.forEach((eachOrder)=>{

        if(eachOrder.id!=orderIdToCancel){
        leftOrder.push(eachOrder)
        }
        
        
        if(eachOrder.id==orderIdToCancel)
        {
        orderId_found = true;
        }
        
        // when it gets to the last order
        if(all_order_array.indexOf(eachOrder)==(all_order_array.length-1))
        {
            orderInJson.orders = leftOrder;
            if(orderId_found){
                // if the id is found in order array, then update
                IO.update(".orders/pending",email,orderInJson,(err)=>{
                    if(!err){
                        // no error
                        callback(200,{
                                
                            "data":  {"error":"order cancelled"},
                          "header":{"Content-Type":"application/json"}
                          
                          })
                    
                    
                    }
                    else{
                    console.log(err)
                        callback(500,{
                                
                            "data":  {"error":"order not cancelled"},
                          "header":{"Content-Type":"application/json"}
                          
                          })
                    
                    }
                    })
                    
            }else{
        
        
                callback(404,{
                            
                    "data":  {"error":"This order does not exist or may have been deleted"},
                  "header":{"Content-Type":"application/json"}
                  
                  })
              
        
            }
            
        }// last order
        
            })// foreach order
            
 }else{
// console.log("No order")
    callback(200,{
                    
        "data":  {"error":"You have dont have any pending order"},
      "header":{"Content-Type":"application/json"}
      
      })
    


 }
    

 


        
        }else{
        
        console.log(err)
        // create new order file
        callback(200,{
                    
            "data":  {"error":"order not found"},
          "header":{"Content-Type":"application/json"}
          
          })
        
        
        }
        
        })
        
        

 

}else{
 
      
    callback(404,{
            
        "data":  {"error":"please fill all required field in order form"},
      "header":{"Content-Type":"application/json"}
      
      })
    

}


}else{
    
    callback(501,{
            
        "data":  {"error":Notauthentic},
      "header":{"Content-Type":"application/json"}
      
      })
    
}

})



        }else{
            

            callback(404,{
            
                "data":  {"error":"Enter required data"},
              "header":{"Content-Type":"application/json"}
              
              })
            


        }




    }else{
        callback(500,{
            
            "data":  {"error":"Enter required data"},
          "header":{"Content-Type":"application/json"}
          
          })
        
    }

}
else{

    callback(500,{
            
        "data":  {"error":req.method +" not allowed use put instead"},
      "header":{"Content-Type":"application/json"}
      
      })

}

    
    
    }
    
    module.exports = cancelOrder;