const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const discussionRouter = require("./routes/discussion");
const Discussion = require("./models/discussion");

const app = express();
const port = process.env.PORT || 3000;
const url = `mongodb+srv://rajkumar:${"Questa21great"}@cluster0.xfenj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static("public"));
app.use("/discussion", discussionRouter);

app.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find({}).sort({ createdAt: -1 });
    res.render("index", { discussions });
  } catch (err) {
    res.send("Error");
  }
});

app.listen(port, () => {
  console.log(`Listening to the port ${port}......
-------------------------------------------------`);
});
