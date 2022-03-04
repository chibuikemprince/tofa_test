const fs = require("fs");
const path = require("path");

var baseDir = path.join(__dirname,"../../files");

const update = (dir,filename,data,callback)=>{

  fs.open(baseDir+"/"+dir+"/"+filename+".json","r+",(err,fd)=>{
if(!err && fd){

fs.ftruncate(fd,(err)=>{
if(!err){


    fs.writeFile(fd,JSON.stringify(data),(err)=>{

        if(!err){
            fs.close(fd,(err)=>{
              
                if(!err){
        
                    callback(false)
                }else{
                    callback(" Operation failed")
                    console.log("Error closing file "+err)
                }
                
            })
        }else{
            callback("Operation failed")
            console.log("Error writing file "+err)
        }
        
        })
        


}else{
callback("Updating failed")
console.log(err)
}

})// truncate




}else{
    callback(filename+" may already exist")
}




  })// open

//console.log(baseDir)
    

}





module.exports = update;