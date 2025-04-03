const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reward: { type: String, required: true },
  deadline: { type: String },
  members: [{ type: String }],
  files: { type: String },
  progress: { type: String },
});

module.exports = mongoose.model("Project", projectSchema);
