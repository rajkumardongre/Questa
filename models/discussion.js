const mongoose = require("mongoose");
const suggestionSchema = require("./suggestions");
const discussionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  description: {
    type: String,
    required: true,
    trim: false,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  suggestions: [suggestionSchema],
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Discussions", discussionSchema);
