console.log("welcome to My app")

var newForm ;
var ajax;
var submitform = (formid,event,resDiv,method,url,action)=>{
    url ="http://localhost:2000/"+url
    event.preventDefault();
newForm = new FormData(formid);
var dataToSubmitObj = Object.fromEntries(newForm);
var dataToSubmit =  JSON.stringify(dataToSubmitObj)
document.getElementById(resDiv).innerHTML = "Loading";
ajax = new XMLHttpRequest();
	  
ajax.onreadystatechange = function(){
    if(this.readyState==4){
        var responseObj = JSON.parse(this.responseText);



if(action == "login" && responseObj.dashboard==true){
    var eachProduct = "";
    localStorage.setItem("logintoken",responseObj.loginToken);
    localStorage.setItem("email",dataToSubmitObj.email);
    responseObj = responseObj.items;
for (var a in responseObj){
    eachProduct +="<div style='margin-top:20px;background-color: powderblue;padding:10px;margin-button:10px; background-color:#00000'> <b>Name:"+responseObj[a].name+"</b>"+"<br/><b>Description: "+responseObj[a].description+"</b>"+"<br/><b>Price: $"+Number(responseObj[a].price)/100+"</b></br>Quantity: <input type='number' value='1' id='product"+a+"' style='width:50px;display:inline;' /> <br/> <p id='order_result"+a+"'></p><br/><button onclick='order("+a+")'>Order Now</button></div>";
}
document.getElementById(resDiv).setAttribute("align","left");
document.getElementById(resDiv).innerHTML=eachProduct;
document.getElementById("container").style.display="none";
      
    
}else{
    document.getElementById(resDiv).innerHTML=this.responseText;
      
}

if(action=="register" && this.status=="200"){
    document.getElementById(resDiv).innerHTML += "<br/> <h4>You can now login to your account </h4>";
}

    }
}
 
if(method=="get"){
    url = url+"?email="+dataToSubmitObj.email+"&password="+dataToSubmitObj.password;
    ajax.open("GET",url,true);
    // ajax.setRequestHeader("Content-Type","text/plain")
    console.log(url);
ajax.setRequestHeader('tokenid','');
ajax.setRequestHeader('X-Requested-With','XMLHttpRequest');
    ajax.send(dataToSubmit)
}
else if(method=="post"){

    ajax.open("POST",url,true);
    
ajax.setRequestHeader('tokenid','');
ajax.setRequestHeader('X-Requested-With','XMLHttpRequest');
  //  ajax.setRequestHeader("Content-Type","text/plain")
    ajax.send(dataToSubmit)
}



}

var orderajax;
var order = (id)=>{
document.getElementById("order_result"+id).innerHTML=" ";
var quantityOrder = document.getElementById("product"+id).value;

if(quantityOrder>0){

    orderajax = new XMLHttpRequest();
	  
    orderajax.onreadystatechange = function(){
        if(this.readyState==4){
            var responseObj = JSON.parse(this.responseText);
            document.getElementById("order_result"+id).innerHTML=this.responseText;
        }
        
    }

    
    orderajax.open("POST","http://localhost:2000/createorder",true);
    
    orderajax.setRequestHeader('tokenid',localStorage.getItem("logintoken"));
    orderajax.setRequestHeader('X-Requested-With','XMLHttpRequest');
      //  ajax.setRequestHeader("Content-Type","text/plain")
      orderajax.send(JSON.stringify(  {email:localStorage.getItem("email"),productId:Number(id),quantity:Number(quantityOrder) } ) )




}else{
    document.getElementById("order_result"+id).innerHTML="Enter a valid quantity";
}



}

