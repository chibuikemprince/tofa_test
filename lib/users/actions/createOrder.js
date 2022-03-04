const tokenAuth = require("../../Auth/tokenAuth");
const helpers = require("../../helpers");
// const update = require("../io/update");
const fs = require("fs")
const path = require("path");
const IO = require("../../io/all")
const products = require("../../../produts");

var baseDir = path.join(__dirname,"../../../files");


var createOrder =(req,res,callback)=>{

    
    var userData = req.reqObject.data;
    var userHeaders = req.reqObject.headers;


    if(req.method.toLowerCase()=="post"){

    if(userData && userHeaders){

        var email = typeof(userData.email)=="string" && userData.email.length>0 && helpers.validEmail(userData.email)?userData.email:false;
        var tokenId = typeof(userHeaders.tokenid)=="string" && userHeaders.tokenid.length==64?userHeaders.tokenid:false;
        if(email && tokenId){
tokenAuth(tokenId,email,(Notauthentic)=>{
if(!Notauthentic){
    var productId = typeof(userData.productId)== "number" ?userData.productId:false;
    var quantity = typeof(userData.quantity)== "number" ?userData.quantity:false;
   if(productId && quantity)
{

if(typeof(products[productId] ) =="object"  ){
    var today = Date.now()
var orderId = helpers.hash(email+today)

if(orderId){

    var orderObj={
        "id":orderId,
        "productId":productId,
        "quantity":quantity,
        "status":"pending",
        "time":Date.now()
        
        
        }
        
        fs.readFile(baseDir+"/.orders/pending/"+email+".json","utf-8",(err,data)=>{
        if(!err && data){
        //update orderfile

var orderInJson = helpers.strToJson(data);
var all_order_array = orderInJson.orders

if(all_order_array.length<10){


    all_order_array.push(orderObj);

    orderInJson.orders = all_order_array;
    
    IO.update(".orders/pending",email,orderInJson,(err)=>{
    if(!err){
        // no error
        callback(200,{
                
            "data":  {"message":"order saved"},
          "header":{"Content-Type":"application/json"}
          
          })
    
    
    }
    else{
    
        callback(500,{
                
            "data":  {"error":"order not saved"},
          "header":{"Content-Type":"application/json"}
          
          })
    
    }
    })
    

}else{
// orders can't be more than 5
callback(200,{
                    
    "data":  {"error":"You can't create more than 10 orders before payment, kindly pay for the previous orders you made before creating new orders"},
  "header":{"Content-Type":"application/json"}
  
  })


}


        
        }else{
        
        console.log(err)
        // create new order file
        IO.create(".orders/pending",email,{"orders":[orderObj]},(err)=>{
        if(!err){ 
        
            callback(200,{
                    
                "data":  {"message":"order created , you can now move to payment setion"},
              "header":{"Content-Type":"application/json"}
              
              })
           
            
        }else{
        
        console.log(err)
            callback(500,{
                    
                "data":  {"error":"creating new order failed"},
              "header":{"Content-Type":"application/json"}
              
              })
           
        
        
        }
        
        })
        
        
        
        }
        
        })
        
        
}else{
// order id not created
callback(500,{
            
    "data":  {"error":"Error reating order id, please reate a new order"},
  "header":{"Content-Type":"application/json"}
  
  })

}


}else{

   
    callback(404,{
            
        "data":  {"error":"please enter a valid product id"},
      "header":{"Content-Type":"application/json"}
      
      })
   


}


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
            
        "data":  {"error":req.method +" not allowed use post instead"},
      "header":{"Content-Type":"application/json"}
      
      })

}

    
    
    }
    
    module.exports = createOrder;