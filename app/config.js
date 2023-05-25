const { MongoClient } = require("mongodb");
const connectionString =process.env.CONNECTION;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let dbConnection;
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      dbConn=db;
      dbConnection = db.db("viewers");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
   // console.log(dbConnection);
    return dbConnection;
  },

};