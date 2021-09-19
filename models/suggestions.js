const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = suggestionSchema;
