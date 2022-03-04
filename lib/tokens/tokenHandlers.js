const deleteToken = require("./deleteToken");
const editToken = require("./editToken");

var handlers = {}
  
handlers.put = editToken;
handlers.delete = deleteToken;

var userHandlers = {
 
"put":handlers.put,
"delete":handlers.delete

}



module.exports = userHandlers