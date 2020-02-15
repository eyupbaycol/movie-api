const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb://movie_user:abcd1234@ds211829.mlab.com:11829/heroku_61qc81fq"
  );
  mongoose.connection.on("open", () => {
    //console.log("mongodb connected");
  });
  mongoose.connection.on("error", err => {
    console.log("mongodb error");
  });

  mongoose.Promise = global.Promise;
};
