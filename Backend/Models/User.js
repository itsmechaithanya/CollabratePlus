const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  firstName: { type: String },

  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  mobile: { type: String },
  role: { type: String },
  designation: { type: String },
  fot: [{ type: String }],
  course: [{ type: String }],
  yop: { type: String },
  resume: { type: String },

  //   address: { type: String },
  //   pincode: { type: String },
  //   state: { type: String },
  //   country: { type: String },
  image: { type: String },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
