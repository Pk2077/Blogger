const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  year: {
    type: Number,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
});

const Article = mongoose.model("Article", schema);
module.exports = Article;
