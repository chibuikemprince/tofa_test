const tokenAuth = require("../Auth/tokenAuth");
const helpers = require("../helpers");
const update = require("../io/update");
const fs = require("fs")
const path = require("path")

var baseDir = path.join(__dirname,"../../files");


var editUser =(req,res,callback)=>{

    
    var userData = req.reqObject.data;
    var userHeaders = req.reqObject.headers;

    if(userData && userHeaders){

        var email = typeof(userData.email)=="string" && userData.email.length>0 && helpers.validEmail(userData.email)?userData.email:false;
        var tokenId = typeof(userHeaders.tokenid)=="string" && userHeaders.tokenid.length==64?userHeaders.tokenid:false;
        if(email && tokenId){
tokenAuth(tokenId,email,(Notauthentic)=>{
if(!Notauthentic){
    var name = typeof(userData.name)== "string" && userData.name.length>2 && helpers.validName(userData.name)?userData.name:false;
    var password = typeof(userData.password)=="string" && userData.password.length>2?userData.password:false;
    var address = typeof(userData.address)=="string" && userData.address.length>2?userData.address:false;
 
fs.readFile(baseDir+"/.users/"+email+".json","utf-8",(err,data)=>{
if(!err && data){

    if(name || password || address)   {
        
var newUserData = helpers.strToJson(data);

if(name){
    newUserData.name =name;
}
if(password){
    newUserData.password = helpers.hash(password);
}
if(address){
    newUserData.address = address;
}

        update(".users",email,newUserData,(err)=>{
            if(!err){
                
            
                callback(200,{
                        
                    "data":  {"msg":"User updated"},
                  "header":{"Content-Type":"application/json"}
                  
                  })
                
            
            
            
            }else{
            
            
                callback(500,{
                        
                    "data":  {"error":err},
                  "header":{"Content-Type":"application/json"}
                  
                  })
                
            
            
            }
            
            })
            
            
     } else{
    
    
        callback(500,{
                        
            "data":  {"msg":"No new change made"},
          "header":{"Content-Type":"application/json"}
          
          })
        
    
     }
}else{


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
    
    module.exports = editUser;