const fs = require("fs");
const path = require("path");
const helpers = require("../helpers");

var baseDir = path.join(__dirname,"../../files");


const readData = (dir,filename,callback)=>{

fs.readFile(baseDir+"/"+dir+"/"+filename+".json","utf-8",(err,data)=>{

if(!err && data){
    var jsonData = helpers.strToJson(data)
    callback(false,jsonData)
}else{
    callback(true,err)
}

})


}