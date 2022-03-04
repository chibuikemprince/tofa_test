const create = require("./create")
const deleteFile = require("./delete")
const updateFile = require("./update")
const readData = require("./readData")


var IO = {}
IO.create = create
IO.delete = deleteFile;
IO.update = updateFile;
IO.read = readData;

module.exports=IO;
