const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/universityDB";
var DataBase  = function(){

};

var _db;

DataBase.connectToServer = function() {
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        _db = db;
        console.log("CONNECTED TO MONGODB");
    } );
};

DataBase.disconnectFromServer = function(){
    _db.close();
    console.log("DISCONNECTED FROM MONGODB");
};

DataBase.getDb = function() {
    return _db;
};

module.exports = DataBase;