const   fs  = require("fs");
const helpers = require("../helpers");
const path = require("path")
const createToken = require("../tokens/createToken");
const products = require("../../produts")

var baseDir = path.join(__dirname,"../../files");

var getUser =(req,res,callback)=>{
 


    var userData = req.reqObject.data;
    if(userData){

        
var email = typeof(userData.email)=="string" && userData.email.length>0 && helpers.validEmail(userData.email)?userData.email:false;
var password = typeof(userData.password)=="string" && userData.password.length>2?userData.password:false;

if(email && password){




    fs.readFile(baseDir+"/.users/"+email+".json","utf-8",(err,data)=>{
        if(!err && data){
           password = helpers.hash(password)
             
           var myData = helpers.strToJson(data)
        if(password){
            //console.log(password+"  "+myData.password)
         var today = Date.now();
var tokenId = helpers.hash(email+today)


        if(password==myData.password){
        
            if(tokenId){
var tokenObj = {

"tokenid":tokenId,
"email":email,
"expires":today+1000*60*10


}


createToken(tokenId,tokenObj,(err)=>{
if(!err){
// products.loginToken = tokenId
// products.dashboard=true;
    callback(200,{
                    
        "data": {items:{...products},loginToken:tokenId,dashboard:true} ,
      "header":{"Content-Type":"application/json"}
      
      })


}else{
    callback(500,{
                    
        "data":  {"error":"Login token couldnt be created"},
      "header":{"Content-Type":"application/json"}
      
      })  
}


})



               
            }else{

                callback(500,{
                    
                    "data":  {"error":"Login token not created"},
                  "header":{"Content-Type":"application/json"}
                  
                  })   
            }
            
        
        
        
        }else{
             
            callback(404,{
                    
                "data":  {"error":"Incorrect Login details"},
              "header":{"Content-Type":"application/json"}
              
              })
        
        }
        
        
        }else{
        
         
            callback(500,{
                    
                "data":  {"error":"User login failed"},
              "header":{"Content-Type":"application/json"}
              
              })
        
        
        }
        
        
        
        }else{
           
            callback(404,{
                    
                "data":  {"error":"USer not found"},
              "header":{"Content-Type":"application/json"}
              
              })
        
        }
        
        })
        




}
else{
     
    callback(404,{
            
        "data":  {"error":"invalid email and password"},
      "header":{"Content-Type":"application/json"}
      
      })

}

    }else{
        
        callback(500,{
            
            "data":  {"error":"Enter your login details"},
          "header":{"Content-Type":"application/json"}
          
          })

    }
// userdata not specified

    
    
    
    }
    
    module.exports = getUser;