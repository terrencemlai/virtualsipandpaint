const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  console.log(res);
  res.send("Welcome to Virtual Sip & Paint!");
});

app.use("/api/users", users);
app.use("/api/rooms", rooms);

const port = process.env.PORT || 5000; 

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});