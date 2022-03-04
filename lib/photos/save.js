const   create   = require("../io/create");
const helpers = require("../helpers");
const https = require('https');
const update = require("../io/update")
const fs = require("fs")
const path = require("path")


var baseDir = path.join(__dirname,"../../files");
////console.log("PAth: ",baseDir)
class Photo{
 
    constructor(){
        this.DB = []
        this.keys = []
        this.startTime = Date.now();
        this.count = 1;
        this.lock({lock:"false"});
////console.log("Photo Created. Lock: ",this.getLock())
 
        fs.readFile(baseDir+"/.photos/DB.json","utf-8",(err,data)=>{
            ////console.log(err,data);
            //return;
            
              
            if(err && err.errno=="-4058"){
            
                // write
                var userData = [helpers.strToJson([])];
            
               // 
                create(".photos","DB",userData,(err)=>{
                    if(!err){
                ////console.log("created")
                
                    }
                    else{
                        ////console.log(err)
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


async fetch(id){

return new Promise((resolve,reject)=>{



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
     resolve("fetch already in progress or completed");
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
 
resolve("Fetching data on background");
return;
             });
           
           }).on("error", (err) => {
             this.fetch(id);
             this.lock({lock:"false"});
             //this.save(data,true)
             
resolve("Fetching data on background");
return;
             //////console.log("Error: " + err.message);
           });
 
 
 
 
 
 
 
 
     }, 1000)
 
 
 
    
    });





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

var {start,end,order} = userData;

//////console.log("REQ DATA: ",userData)
if(!start){
    start = 0
}
if(!end){
    end = 10
}


if(!order){
    order = "title"
}


if(end>100){
    callback(401, {"message":"you cant fetch more than 100 data at once"})
}

if(end>this.DB.length){
    end = this.DB.length;
}
    
//////console.log("GET DB: ",this.DB);

callback(200,{message:"Fetched successfully." ,data:this.DB})
// return;
let myArray = this.DB.slice(start,parseInt(start+end))

 

  myArray.sort((a,b) => (a[order] > b[order]) ? 1 : ((b[order] > a[order]) ? -1 : 0))
  /* myArray = myArray.map(a=>{ 
      a = JSON.parse(a)
      return `<p align='center'> <br/><hr/>ID: ${a.id}, Album ID: ${a.albumid} <h4>${a.title}</h4> <img src='${a.url}'/>  </p>`
  }) */
//////console.log(typeof myArray,"-",myArray, start,end)
callback(200,{message:"Fetched successfully." ,data:myArray})
}



}
 
 
module.exports =  Photo;