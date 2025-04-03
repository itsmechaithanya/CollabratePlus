const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 100000 }, // Start from 100000
});

module.exports = mongoose.model("Counter", counterSchema);
