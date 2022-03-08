const   create   = require("../io/create");
const helpers = require("../helpers");
const https = require('https');
const update = require("../io/update")
const fs = require("fs")
const path = require("path")


var baseDir = path.join(__dirname,"../../files");
//////console.log("PAth: ",baseDir)
class Photo{
 
    constructor(){
        this.DB = []
        this.keys = []
        this.startTime = Date.now();
        this.count = 1;
        this.lock({lock:"false"});
//////console.log("Photo Created. Lock: ",this.getLock())
 
        fs.readFile(baseDir+"/.photos/DB.json","utf-8",(err,data)=>{
            //////console.log(err,data);
            //return;
            
              
            if(err && err.errno=="-4058"){
            
                // write
                var userData = [helpers.strToJson([])];
            
               // 
                create(".photos","DB",userData,(err)=>{
                    if(!err){
                //////console.log("created")
                
                    }
                    else{
                        //////console.log(err)
                    }
                    })
                
                return;
                } 
            
            
                if(!err && data){
                
                        var  todayDate = Date.now()
               
              //mydata
            
               
            
            update(".photos","DB",[],(err)=>{
                if(!err){
                    
                 ////console.log("Saved")
                
                
                
                
                }else{
                    ////console.log("eror: ", err)
                
                
                }
                
                })
             
            
            
            }
            else{
                ////console.log("Save Error: ",err);
            }
            
                })



    }


    lock(value){
        fs.readFile(baseDir+"/.photos/DB_LOCK.json","utf-8",(err,data)=>{
            ////console.log("LOCK: ", err,"D: ",data)    
            if(err && err.errno=="-4058"){
            
                // write
                var userData = [helpers.strToJson([])];
            
               // 
                create(".photos","DB_LOCK",value,(err)=>{
                    if(!err){
                ////console.log("created")
                
                    }
                    else{
                        ////console.log(err)
                    }
                    })
                
                return;
                } 


          
                if(!err)
                {
                
                        var  todayDate = Date.now()
               
              //mydata
            
               
            
            update(".photos","DB_LOCK",value,(err)=>{
                if(!err){
                    
                 ////console.log("Saved..")
                
                
                
                
                }else{
                    ////console.log("eror: ", err)
                
                
                }
                
                })
             
            
            
            }
            else{
                ////console.log("Save Error,,: ",err);
            }
            
                })
    
    
    
    }
    

    getLock(){
        return new Promise((
            resolve,reject
        )=>{



            fs.readFile(baseDir+"/.photos/DB_LOCK.json","utf-8",(err,data)=>{
                //////console.log("Lock ",data); 
             if(err && err.errno=="-4058"){
              
                 
                resolve(false);
                 } 
             else{
                  resolve(data);
             }
             
                 
             
                 })


        })
       
    
    
    
    }
    
       



reset(callback){
    this.DB = [];
    this.keys = [];
    this.currentData = {};
  
   // callback(200,{"message":"DB cleared"})
}

edit(req){
return new Promise((resolve,reject)=>{
  let  {userid,dataid,newdata} =  req.reqObject.data



if(!dataid){
    reject("select data to edit")
    return;
}


dataid = parseInt(dataid)-1;
//console.log(dataid)
if(dataid<0){
    dataid = 0;
}



try {


if(!newdata){
    reject("Enter newdata to update")
    return;
}

 
if(!userid){
    reject("Enter user id")
    return;
}


this.getLock()
    .then(lockValue=>{
		
     lockValue = JSON.parse(lockValue)  
 // console.log(typeof lockValue, lockValue, lockValue.id )
 if( !lockValue.id || lockValue.id != userid){
 //////console.log("fetch already in progress or completed.")
     resolve({msg:"you are not allowed to edit.",userid});
     
     return;
 }




    
    if(typeof newdata =="string"){
newdata = JSON.parse(newdata)
    }
 
 
    let {albumId,url,title,thumbnailUrl} = newdata;
    newdata = {albumId,url,title,thumbnailUrl} 

let DB_Data =   this.DB[dataid]

if(!DB_Data){
    reject("No data found.")
    return;
}

if(typeof DB_Data =="string"){
DB_Data = JSON.parse(DB_Data)
    }
 


for(let a in newdata){
if(newdata[a]){
  DB_Data[a] = newdata[a]
}

}
 this.DB[dataid] = JSON.stringify(DB_Data)
 resolve({msg:"Update done."}) 



    })
	
	.catch(err=>{
        console.log(err)
		reject("Error found, please try again")  
return;
	}
		)

} catch (error) {
  reject("Error found, please try again")  
return;

}







})



}




del(req){
return new Promise((resolve,reject)=>{
  let  {userid,dataid } =  req.reqObject.data



if(!dataid){
    reject("select data to delete")
    return;
}


dataid = parseInt(dataid)-1;
//console.log(dataid)
if(dataid<0){
    dataid = 0;
}

try {

 

if(!userid){
    reject("Enter user id")
    return;
}


this.getLock()
    .then(lockValue=>{
		
     lockValue = JSON.parse(lockValue)  
 // console.log(typeof lockValue, lockValue, lockValue.id )
 if( !lockValue.id || lockValue.id != userid){
 //////console.log("fetch already in progress or completed.")
     resolve({msg:"you are not allowed to delete.",userid});
     
     return;
 }
 
 
 delete this.DB[dataid]  
 resolve({msg:"delete done."}) 



    })
	
	.catch(err=>{
        console.log(err)
		reject("Error found, please try again")  
return;
	}
		)

} catch (error) {
  reject("Error found, please try again")  
return;

}







})



}









async fetch(id){

return new Promise((resolve,reject)=>{

try {
    


    if(!id){
        id = Date.now()
    }
  //  var  =   false;
     this.getLock()
    .then(lockValue=>{
     lockValue = JSON.parse(lockValue)  
 //////console.log(typeof lockValue)
 if(lockValue.lock=="true" && lockValue.id !=id){
 //////console.log("fetch already in progress or completed.")
     resolve({msg:"fetch already in progress or completed",id});
     
     return;
 }

 
 this.lock({lock:"true",id:id});
 
    // this.startTime = Date.now();
 let mycount = parseInt(this.count);
     //get data, once returned call thesame function in 1min time.
     let fetching = setTimeout(()=>{
 
         
         ////////console.log("Fetching: ",parseInt(this.count))
 
         https.get('https://jsonplaceholder.typicode.com/photos/'+mycount, (resp) => {
             let data = '';
           
             // a data chunk has been received.
             resp.on('data', (chunk) => {
                 
               data += chunk;
             });
           
             // complete response has been received.
             resp.on('end', () => {
                 clearTimeout(fetching);
                this.count =parseInt(this.count)+1;
                 //let DataToJson = helpers.DataToJson (data)
               ////////console.log(data);
              // let  = helpers.DataToJson (data)
              if( (this.count>=100)  ){
                 this.save(data,true)
              //   this.fetch();
                 
 
 }
 else if ( data && data !='{}'){
     this.save(data,false)
     this.fetch(id);
     
 
 }
 else{
 
     this.save(data,true)
                
 //
 
 
 }
 
resolve({msg:"Fetching data on background",id});
return;
             });
           
           }).on("error", (err) => {
             this.fetch(id);
             this.lock({lock:"false"});
             //this.save(data,true)
             console.log(err)
resolve({msg:"Fetching data on background",id});
return;
             //////console.log("Error: " + err.message);
           });
 
 
 
 
 
 
 
 
     }, 60000)
 
 
 
    
    });



} catch (error) {
console.log(error)
  reject("Error found , Please try again.")

}

})

}

save(data,store){





    var hashKey = helpers.hash(data)
var mydata = data;
if(this.keys.indexOf(hashKey)==-1){
//doesnt exist
this.DB.push(data);
this.keys.push(hashKey);

if(store){
fs.readFile(baseDir+"/.photos/DB.json","utf-8",(err,data)=>{
//////console.log(err,data);
//return;

  
if(err && err.errno=="-4058"){

    // write
    var userData = [helpers.strToJson(this.DB)];

   // 
    create(".photos","DB",userData,(err)=>{
        if(!err){
    //////console.log("created")
    
        }
        else{
            //////console.log(err)
        }
        })
    
    return;
    } 


    if(!err && data){
    
            var  todayDate = Date.now()
   
  //mydata

  //var newUserData = helpers.strToJson(data);
// newUserData.push(mydata);

update(".photos","DB",this.DB,(err)=>{
    if(!err){
        
     //////console.log("Saved")
    
    
    
    
    }else{
        //////console.log("eror: ", err)
    
    
    }
    
    })
 


}
else{
    //////console.log("Save Error: ",err);
}

    })

}

////////console.log(this.keys)
////////console.log(this.DB)
}
else{
    //////console.log(`${data} already exist`);
     
}

//callback(200,{"message":"Data is now fetched and stored to memeory."})

}

get(req,res,callback){

    var userData = req.reqObject.data;

var {start,end,order,dir} = userData;

 //console.log("REQ DATA: ",userData)
if(!dir)
{
    dir = "asc";
}
if(!start){
    start = 0
}

start = parseInt(start)-1;
if(start<0){start = 0 ;}


if(!end){
    end = 10
}


if(!order){
    order = "title"
}


if(end>100){
    callback(401, {"message":"you cant fetch more than 100 data at once","header":{"Content-Type":"application/json"}})
}

/* if(end>this.DB.length){
    end = this.DB.length;
} */
    
//////console.log("GET DB: ",this.DB);

 //console.log("REQ DATA: ",{start,end,order,dir},this.DB)
//callback(200,{message:"Fetched successfully." ,data:this.DB})
// return;
//console.log(parseInt(start), " - ", parseInt(end))
end = parseInt(start)+ parseInt(end)
//console.log("End: ",end)
let myArray = this.DB.slice(start,end)
dir = dir.toLowerCase();

var dirInt = 1;
if(dir!="asc"){
    dirInt = -1
}
 

myArray = myArray.sort((a,b) => {

      a = JSON.parse(a)
      b = JSON.parse(b)
      if(a[order] > b[order]){
    //  console.log("D: ",dirInt)
  return dirInt;
  }
  else if(a[order] < b[order] ){
      
  //  console.log("0-D: ",0-dirInt)
  return 0-dirInt;
  
  
  }
  else{
      
  return 0
  }
  
  
  
  
  
  
  })
  /*  

  myArray = myArray.map(b=>{
    let c = JSON.parse(b);
return  `<h1>albumId:${c.albumId} <br/> Id:${c.id} <br/>title:${c.title}</h1> </img src='${c.url}'>`

    
})
 */


//////console.log(typeof myArray,"-",myArray, start,end)
callback(200,{message:"Fetched successfully." ,data:myArray,"header":{"Content-Type":"application/json"}})
}



}
 
 
module.exports =  Photo;