const express = require("express");
const morgan = require("morgan");
const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const campsiteRouter = require("./routes/campsiteRouter");
const promotionRouter = require("./routes/promotionRouter");
const partnerRouter = require("./routes/partnerRouter");
const passport = require("passport");

const hostname = "localhost";
const port = 3000;

const mongoose = require("mongoose");
const url =
  "mongodb+srv://carter:Bingo412$*@nucamp-primary.tlnr4rk.mongodb.net/sample_mflix";
const connect = mongoose.connect(url, {});

connect.then(
  () => console.log("Connected correctly to server"),
  (err) => console.log(err)
);

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(express.static(__dirname + "/public"));

app.use("/campsites", campsiteRouter);
// app.use("/promotions", promotionRouter);
app.use("/partner", partnerRouter);

app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
