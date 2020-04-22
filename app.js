const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');

const http = require("http").Server(app);
const io = require("socket.io")(http);
// var io = require('socket.io')(server, 
//   { origins: 'mydomain.com:* http://mydomain.com:* http://www.mydomain.com:*' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./passport/passport")(passport);

// app.get("/", (req, res) => {
//   console.log(res);
//   res.send("Welcome to Virtual Sip & Paint!");
// });

app.use("/api/users", users);
app.use("/api/rooms", rooms);


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

io.on("connection", (socket) => {
  console.log("Connected to Socket!" + socket.id);
  // socket.emit("init", {});
  socket.on("startDrawing", (room, data) => {
    socket.broadcast.to(room).emit("startDrawing", data);
  });

  socket.on("draw", (room, data) => {
    socket.broadcast.to(room).emit("draw", data);
  });

  //  a room is created with a name variable called "room"
  // this when we create room
  socket.on("create", (room) => {
    console.log("create room data " + room);
    socket.join(room);
  });
  // this when others joins the room
  // socket.on("join", (room) => {
  //   console.log("join data " + room);
  //   socket.join(room);
  // });
});

const port = process.env.PORT || 5000; 

http.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

