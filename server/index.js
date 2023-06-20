const express = require("express");
const mongoose = require("mongoose");
const articles = require("./routes/articles");
const cors = require("cors");

const app = express();

//mongoose connextion
mongoose.connect("mongodb://127.0.0.1:27017/articles", {
  useUnifiedTopology: true,
});

app.use(express.json());
// use cors
app.use(cors());

//api Path
app.use("/articles", articles);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Connected on ${port}`));

module.exports = server;
