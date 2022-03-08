
var base_url = "http://localhost:2000" ; 
var order="id"
var end=10
var start=1
var dir="asc"





$("#filter").click(function(){

  order = document.getElementById("order").value;
  dir = document.getElementById("dir").value;
  
  get_photos(order,end,start,dir)
   
});



$("#previous").click(function(){

  order = document.getElementById("order").value;
  dir = document.getElementById("dir").value;
  end = end-10;
  if(end<10){
    end =10
  }
  start = start-10
if(start<0){
  start =0;
}

   get_photos(order,end,start,dir)
   
});



$("#next").click(function(){

  order = document.getElementById("order").value;
  dir = document.getElementById("dir").value;
  end = end+10;
  start = start+10
   get_photos(order,end,start,dir);
   
});








$("#startbutton").click(function(){
	//
  $.ajax({url: base_url+"/start", success: function(result){
	  console.log(result)
    $("#nav_msg").html(result.msg);
    setTimeout(()=>{
     $("#nav_msg").html("");
     get_photos()
},80000)

  },
  error:(err,status)=>{
	  console.log(err)
	 $("#nav_msg").html(err.message);  
setTimeout(()=>{
     $("#nav_msg").html("");
},3000)

  }
  
  
  });
});


function get_photos(order="id",end=10,start=1,dir="asc"){
 let get_url = base_url+"/photos"+"?order="+order+"&end="+end+"&start="+start+"&dir="+dir
  $.ajax({url: get_url, type:"GET", success: function(result){
	  console.log(result)
    //$("#nav_msg").html(result.msg);
    let photo_data = "";
     result.forEach(elem=>{
       let each_data = JSON.parse(elem)
photo_data +=`  <div class="single-products-catagory clearfix">  <a href="#">  <img src="${each_data.url}" alt="${each_data.title}"> <div class="hover-content">  <div class="line"></div> <p>Id: ${each_data.id},  AlbumId: ${each_data.albumId}</p>  <h4>${each_data.title}</h4> </div>  </a> </div>` ;
     })
$("#main").html(photo_data);
G($)(jQuery);


  },
  error:(err,status)=>{
	  console.log(err)
	// $("#nav_msg").html(err.message);  
 

  }
  
   
});
}

get_photos();





