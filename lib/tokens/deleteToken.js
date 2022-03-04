 
    
    const tokenAuth = require("../Auth/tokenAuth");
    const helpers = require("../helpers");
    const update = require("../io/update");
    const fs = require("fs")
    const path = require("path");
const   deleteFile  = require("../io/delete");
    
    var baseDir = path.join(__dirname,"../../files");
    
    
    var deleteToken =(req,res,callback)=>{
       
        var userData = req.reqObject.data;
        var userHeaders = req.reqObject.headers;
    
        if(userData && userHeaders){
    
            var email = typeof(userData.email)=="string" && userData.email.length>0 && helpers.validEmail(userData.email)?userData.email:false;
            var tokenId = typeof(userHeaders.tokenid)=="string" && userHeaders.tokenid.length==64?userHeaders.tokenid:false;
            if(email && tokenId){
    tokenAuth(tokenId,email,(Notauthentic)=>{
    if(!Notauthentic){
         
    fs.readFile(baseDir+"/.tokens/"+tokenId+".json","utf-8",(err,data)=>{
    if(!err && data){
    
         deleteFile(".tokens",tokenId,(err)=>{
if(!err){

    callback(200,{
                            
        "data":  {"msg":tokenId+" Deleted"},
      "header":{"Content-Type":"application/json"}
      
      })


}else{
    callback(500,{
                            
        "data":  {"error":err},
      "header":{"Content-Type":"application/json"}
      
      })
}


         })


    }
	else{
    
    
        console.log(err)
        callback(404,{
                            
            "data":  {"error":"User not found"},
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
         



    module.exports = deleteToken;