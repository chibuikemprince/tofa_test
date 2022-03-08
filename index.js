
const http = require("http")
const serverHandler = require("./server")
const config = require("./config") 
 
/* handlers.photo = (req,res,callback)=>{

    
}

handlers.start = (req,res,callback)=> {

    Photos.fetch();
    callback(200,{
    
        "data":  {"msg":"Fetching data on background"},
      "header":{"Content-Type":"text/plain"}
      
      })
}
 */


const server = http.createServer((req,res)=>{
 
serverHandler.init(req,res,(status,resData)=>{
 
    // console.log(resData);
    
    if(typeof(resData)=="object"){
    
    status = typeof(status)=="number"?status:500;
    resData = typeof(resData)=="object"?resData:{}
    
     if(!resData.header){
         
     resData.header = {}
     
     }
     
    resData.header["Access-Control-Allow-Origin"] = "*";
    resData.header["Access-Control-Allow-Headers"] = "X-Requested-With,Content-Type";
    resData.header["Access-Control-Allow-Credentials"] = true;
    resData.header["Access-Control-Allow-Methods"] =  "GET POST PUT PATCH DELETE OPTIONS";
    // console.log(resData.header)
    
    
    
    res.writeHead(status,resData.header)   
    
    res.end( JSON.stringify(resData.data) );
    
    }
    else{
    
        res.end(  resData );
    
    }
    
    })
  
})

 config.port = process.env.PORT  || config.port

server.listen(config.port,config.hostname,()=>{

    console.log("App running on %s","http://"+config.hostname+":"+config.port)


})



 
    
    //https://desolate-meadow-12588.herokuapp.com
    //https://floating-thicket-82353.herokuapp.com/