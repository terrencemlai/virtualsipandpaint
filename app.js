const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const artworks = require("./routes/api/artworks");
const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./passport/passport")(passport);



app.use("/api/users", users);
app.use("/api/rooms", rooms);
app.use("/api/artworks", artworks);


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
  app.get("*", (req, res) => res.redirect("/")); 
}

io.on("connection", (socket) => {
  socket.on("startDrawing", (room, data) => {
    socket.broadcast.to(room).emit("startDrawing", data);
  });

  socket.on("draw", (room, data) => {
    socket.broadcast.to(room).emit("draw", data);
  });

  socket.on("video-stream", (room, data) => {
    socket.broadcast.to(room).emit("video-stream", data);
  })


  socket.on("create", (room) => {
    socket.join(room);
  });


});

const port = process.env.PORT || 5000; 

http.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

