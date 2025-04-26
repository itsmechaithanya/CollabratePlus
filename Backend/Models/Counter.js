const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 1 }, // Start from 1, so first JD_0001
});

module.exports = mongoose.model("Counter", counterSchema);
