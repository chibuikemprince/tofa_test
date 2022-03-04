
const url = require("url")
const helpers = require("./lib/helpers")
const routes =require("./lib/routes")
const stringDecoder = require("string_decoder").StringDecoder




var server = {}

server.init =  (req,res,callback)=>{

var requestUrl = url.parse(req.url,true);
var requestedPath = requestUrl.pathname;
var requestedQuery = requestUrl.query;
 
if(requestedPath=="/"){
    requestedPath ="index"
}
 
requestedPath = requestedPath.replace(/^\/+|\/$/g,"");

requestedPath = requestedPath.toLocaleLowerCase()
var mybuffer = new stringDecoder();
var dataFromBuffer = "";

    req.on("data",(data)=>{
     
        dataFromBuffer +=mybuffer.write(data)

    })
    

    req.on("error",(err)=>{
        console.log("request error found "+err)
        
        })

    req.on("end",()=>{
        dataFromBuffer +=mybuffer.end()

req.reqObject = {
    "data": {...helpers.strToJson(dataFromBuffer),...requestedQuery},
    "headers":req.headers
}
  //console.log("Data: ",req.reqObject.data);
    
    res.on("error",(err)=>{
        console.log("error found \n"+err)
    })
    



if((requestedPath.match(/^public\//i)) || (requestedPath.match(/^public$/i))){
var publicPath = requestedPath;

requestedPath = "public";
    req.publicpath = publicPath.replace(/^public[/]{0,}/,"")
    // console.log(req.publicpath)
}
 

    const ServerHandler =  typeof(routes[requestedPath]) !="undefined" ?routes[requestedPath]:routes.index
 
 


ServerHandler(req,res,(status,data)=>{

    callback(status,data)


})



    })
    


    
    }

    module.exports=server;