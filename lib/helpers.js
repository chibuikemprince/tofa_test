const crypto = require("crypto");
const  config   = require("../config");
 
const helpers = {}


helpers.hash= (str)=>{
    if(typeof(str) == "string" && str.length>0)
    
    {
    var hash = crypto.createHmac("sha256",config.hashSalt).update(str).digest("hex");
    return hash; 
    
    }else{
        return false;
    }
    
    }
    
    



helpers.validEmail =  (email)=> {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  helpers.validName =  (name)=> {
    return !/\d/.test(name)
  }


  helpers.strToJson = (str)=>{

    try{
    var newJson = JSON.parse(str)
    return newJson
    }catch(e){
    return false
    }
    
    
    }
    

    helpers.DataToJson = (str)=>{

      try{
      var newJson = JSON.stringify(str)
      return newJson
      }catch(e){
      return false
      }
      
      
      }
      
          
  module.exports=helpers;