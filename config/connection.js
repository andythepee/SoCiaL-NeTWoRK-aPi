const { connect, connection } = require("mongoose");

// Mongoose connection
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialMediaDB";

connect(connectionString);

module.exports = connection;
module.exports = connect;
