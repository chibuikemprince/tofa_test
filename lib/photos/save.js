const   create   = require("../io/create");
const helpers = require("../helpers");
const https = require('https');
class Photo{
 
    constructor(){
        this.DB = []
        this.keys = []
        this.startTime = Date.now();
        this.count = 1;
    }


reset(callback){
    this.DB = [];
    this.keys = [];
    this.currentData = {};
  
   // callback(200,{"message":"DB cleared"})
}


fetch(){
   // this.startTime = Date.now();
let mycount = parseInt(this.count);
    //get data, once returned call thesame function in 1min time.
    let fetching = setTimeout(()=>{

        
        console.log("Fetching: ",parseInt(this.count))

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
              //console.log(data);
             // let  = helpers.DataToJson (data)
              if(data && data !='{}'){
                this.save(data)
                this.fetch();

}
else{

}

            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });








    }, 60000)



}

save(data){





    var hashKey = helpers.hash(data)

if(this.keys.indexOf(hashKey)==-1){
//doesnt exist
this.DB.push(data);
this.keys.push(hashKey);
console.log(this.keys)
console.log(this.DB)
}
else{
    console.log(`${data} already exist`);
     
}

//callback(200,{"message":"Data is now fetched and stored to memeory."})

}

get(req,res,callback){

    var userData = req.reqObject.data;

var {start,end,order} = userData;
if(!start){
    start = 0
}
if(!end){
    end = 0
}

if(!order){
    order = "id"
}


if(end>100){
    callback(401, {"message":"you cant fetch more than 100 data at once"})
}

if(end>this.DB.length){
    end = this.DB.length;
}
    
let myArray = this.DB.slice(start,parseInt(start+end))

//console.log(this.DB);


myArray = myArray.sort((a,b) => (a[order] > b[order]) ? 1 : ((b[order] > a[order]) ? -1 : 0))

console.log(myArray)
callback(200,{message:"Fetched successfully." ,data:myArray})
}



}
 
 
module.exports =  Photo;