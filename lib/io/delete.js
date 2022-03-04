const fs = require("fs")

const path = require("path");

var baseDir = path.join(__dirname,"../../files");



const deleteFile = (dir,filename,callback)=>{

fs.unlink(baseDir+"/"+dir+"/"+filename+".json",(err)=>{

if(!err)
{
callback(false)
}else{
callback("delete process failed")
console.log(err)
}
})


}

module.exports=deleteFile;