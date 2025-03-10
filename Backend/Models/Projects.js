const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  paidFlag: { type: Boolean, required: true },
  deadline: { type: String },
  members: [{ type: String }],
  files: [{ type: String }],
  progress: { type: String },
});

module.exports = mongoose.model("User", projectSchema);
