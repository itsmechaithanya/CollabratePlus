const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./Counter"); // Import the counter model

const projectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reward: { type: String, required: true },
  deadline: { type: String },
  members: [{ type: String }],
  category: { type: String },
  files: { type: String },
  progress: { type: String },
  number: { type: String },
});
projectSchema.pre("save", async function (next) {
  if (!this.number) {
    // Only set number if not already assigned
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "projectNumber" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      this.number = counter.value.toString(); // Convert to string
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Project", projectSchema);
