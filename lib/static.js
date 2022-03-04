const   fs  = require("fs"); 
const path = require("path") 

var baseDir = path.join(__dirname,"public");




var static =(req,res,callback)=>{
    //console.log(baseDir+"/"+req.publicpath)
    if(req.publicpath !=undefined){
        
    fs.readFile(baseDir+"\\"+req.publicpath,"utf-8",(err,data)=>{

if(data){
   // console.log(data);
var ext = req.publicpath.match(/\.\w{1,}$/);
if(ext){
    ext = ext[0];
}
// console.log("ext: ",ext);
if(ext==".html"){
    res.setHeader("Content-Type","text/html");
}
else if(ext==".css"){
    res.setHeader("Content-Type","text/css");
} 

else if(ext==".js"){
    res.setHeader("Content-Type","text/javascript");
} else{
    res.setHeader("Content-Type","text/plain");
}



callback(200,data);





}
else if(err){
     var err_html = "<h1>Page Not Found";
	 res.setHeader("Content-Type","text/html");
    callback(500,err_html)
    //callback(500,{message:err.message})
}

    })





    }else{
        callback(404,{message:'no file found'})
    }




}

module.exports = static;