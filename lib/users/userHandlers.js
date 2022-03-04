const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const editUser = require("./editUser");
const getUser = require("./getUser")

var handlers = {}

handlers.post = createUser
handlers.get = getUser;
handlers.put = editUser;
handlers.delete = deleteUser;

var userHandlers = {
"post":handlers.post,
"get":handlers.get,
"put":handlers.put,
"delete":handlers.delete

}



module.exports = userHandlers