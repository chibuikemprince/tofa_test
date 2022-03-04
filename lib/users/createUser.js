const   create   = require("../io/create");
const helpers = require("../helpers");
 

 


var createUser =(req,res,callback)=>{
 
    var userData = req.reqObject.data;
    if(userData){
        
    
    var email = typeof(userData.email)=="string" && userData.email.length>0 && helpers.validEmail(userData.email)?userData.email:false;
    var name = typeof(userData.name)== "string" && userData.name.length>2 && helpers.validName(userData.name)?userData.name:false;
    var password = typeof(userData.password)=="string" && userData.password.length>2?userData.password:false;
    var address = typeof(userData.address)=="string" && userData.address.length>2?userData.address:false;
     
    // console.log(userData.email,userData.name,userData.password,email,name,password)
    if(email && name && password && address){
    
        password = helpers.hash(password)
        userData.time = Date.now()
    if(password){
        userData.password = password
    
        create(".users",email,userData,(err)=>{
            if(!err){
        
                callback(200,{
                
                    "data":  { "msg":"User registered successfully "},
                  "header":{"Content-Type":"application/json"}
                  
                  })
        
            }else{
        
                console.log(err)
                callback(500,{
                
                    "data":  {"error":err},
                  "header":{"Content-Type":"application/json"}
                  
                  })
            
        
        
            }
        
        });
        
          
    }else{
       console.log("error trying to hash password")
        callback(500,{
            
            "data":  {"error":"Registration failed"},
          "header":{"Content-Type":"application/json"}
          
          })
    
    
    
    
    }
    
    }else{
    
    
        callback(500,{
            
            "data":  {"error":"Invalid Data Entered"},
          "header":{"Content-Type":"application/json"}
          
          })
    
    
    
    
    
    
    
        }
    
    
    
    }// if userData array is defined
    
    
    else{
        callback(200,{
            
            "data":  {"error":" Enter your Data"},
          "header":{"Content-Type":"application/json"}
          
          })
        
    }
    
    




}

module.exports = createUser;