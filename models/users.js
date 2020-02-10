var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 5
  }
});

module.exports = mongoose.model("user", UserSchema);
