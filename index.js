
const http = require("http")
const serverHandler = require("./server")
const config = require("./config") 
const photo = require("./lib/photos/save")
const helpers = require("./lib/helpers")
const stringDecoder = require("string_decoder").StringDecoder
const url = require("url")

var mybuffer = new stringDecoder();
var dataFromBuffer = "";

var Photos = new photo()
console.log("Photos: ",Photos);

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



    if (req.url == '/photos') { //check the URL of the current request
        

        req.on("data",(data)=>{
     
            dataFromBuffer +=mybuffer.write(data)
    
        })
        
    
        req.on("error",(err)=>{
            console.log("request error found "+err)
            
            })
    
        req.on("end",()=>{
            dataFromBuffer +=mybuffer.end()
    
    req.reqObject = {
        "data": {...helpers.strToJson(dataFromBuffer)},
        "headers":req.headers
    }
      //console.log("Data: ",req.reqObject.data);
        
        res.on("error",(err)=>{
            console.log("error found \n"+err)
        })



        Photos.get(req,res,(status,resData)=>{


            status = typeof(status)=="number"?status:500;
            resData = typeof(resData)=="object"?resData:{}
            
             if(!resData.header){
                 
             resData.header = {}
             
             }
             
            resData.header["Access-Control-Allow-Origin"] = "http://localhost:2000";
            resData.header["Access-Control-Allow-Headers"] = "X-Requested-With,Content-Type";
            resData.header["Access-Control-Allow-Credentials"] = true;
            resData.header["Access-Control-Allow-Methods"] =  "GET POST PUT PATCH DELETE OPTIONS";
            // console.log(resData.header)
            
            
            
            res.writeHead(status,resData.header)   
            
            res.end( JSON.stringify(resData) );



        }) 
         


        
    })    






        // set response header
       // res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        //res.write('<html><body><p>This is home Page.</p></body></html>');
       // res.end();
    
    }

else if (req.url == '/start') { //check the URL of the current request
    Photos.fetch();
 

        var resData = {"message":"fetch running on background"}
        var status = 200;
        status = typeof(status)=="number"?status:500;
        resData = typeof(resData)=="object"?resData:{}
        
         if(!resData.header){
             
         resData.header = {}
         
         }
         
        resData.header["Access-Control-Allow-Origin"] = "http://localhost:2000";
        resData.header["Access-Control-Allow-Headers"] = "X-Requested-With,Content-Type";
        resData.header["Access-Control-Allow-Credentials"] = true;
        resData.header["Access-Control-Allow-Methods"] =  "GET POST PUT PATCH DELETE OPTIONS";
        // console.log(resData.header)
        
        
        
        res.writeHead(status,resData.header)   
        
        res.end( JSON.stringify({"message":"fetch running on background"}) );
 


    // set response header
   // res.writeHead(200, { 'Content-Type': 'text/html' }); 
    
    // set response content    
    //res.write('<html><body><p>This is home Page.</p></body></html>');
   // res.end();

}





else{
    
serverHandler.init(req,res,(status,resData)=>{
 
    console.log(resData);
    
    if(typeof(resData)=="object"){
    
    status = typeof(status)=="number"?status:500;
    resData = typeof(resData)=="object"?resData:{}
    
     if(!resData.header){
         
     resData.header = {}
     
     }
     
    resData.header["Access-Control-Allow-Origin"] = "http://localhost:2000";
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
    
}
})



server.listen(config.port,config.hostname,()=>{

    console.log("App running on %s","http://"+config.hostname+":"+config.port)


})

 
    