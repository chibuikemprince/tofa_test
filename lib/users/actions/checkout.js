const tokenAuth = require("../../Auth/tokenAuth");
const helpers = require("../../helpers");
// const update = require("../io/update");
const fs = require("fs")
const path = require("path");
const IO = require("../../io/all")
const products = require("../../../produts");

var baseDir = path.join(__dirname,"../../../files");
const checkOut = {}

 checkOut.get =(req,res,callback)=>{

    
    var userData = req.reqObject.data;
    var userHeaders = req.reqObject.headers;

 

    if(userData && userHeaders){

        var email = typeof(userData.email)=="string" && userData.email.length>0 && helpers.validEmail(userData.email)?userData.email:false;
        var tokenId = typeof(userHeaders.tokenid)=="string" && userHeaders.tokenid.length==64?userHeaders.tokenid:false;
        if(email && tokenId){
tokenAuth(tokenId,email,(Notauthentic)=>{
if(!Notauthentic){
     
  
    fs.readFile(baseDir+"/.orders/pending/"+email+".json","utf-8",(err,data)=>{
        if(!err && data){
        //update orderfile

var orderInJson = helpers.strToJson(data);
var all_order_array = orderInJson.orders
 var checkOutList = {};
 var orderId_found = false;
 var produtName ="";
 var productQuantity = "";
 var produtPrice = "";
 var totalPrice = 0;
 //ensure that the all_order_array is not an empty array
 if( (all_order_array instanceof Array) && all_order_array.length>0){
    // console.log(all_order_array instanceof Array)
    all_order_array.forEach((eachOrder)=>{

       if( typeof(products[eachOrder.productId]) !="undefined"){

        produtName = products[eachOrder.productId].name;
        productQuantity = eachOrder.quantity;
        produtPrice = Number(products[eachOrder.productId].price)/100;
        produtPrice = produtPrice.toFixed(2)
        totalPrice += Number(productQuantity)*Number(produtPrice);
         if(typeof(checkOutList[produtName])== "undefined"){
checkOutList[produtName]={"quantity":productQuantity,"cost":produtPrice+" X "+productQuantity+" = "+(Number(productQuantity)*Number(produtPrice)).toFixed(2)}
         }else{
            checkOutList[produtName].quantity = Number(checkOutList[produtName].quantity)+Number(productQuantity)
   
            checkOutList[produtName].cost = produtPrice+" X "+checkOutList[produtName].quantity+" = "+Number(checkOutList[produtName].quantity)*Number(produtPrice)
     
            
        }


       }
        
         


        // when it gets to the last order
        if(all_order_array.indexOf(eachOrder)==(all_order_array.length-1))
        {
             checkOutList.totalCost = totalPrice.toFixed(2);
             
             callback(200,{
                            
                "data":  checkOutList,
              "header":{"Content-Type":"application/json"}
              
              })
          
    




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
    
    module.exports = checkOut;