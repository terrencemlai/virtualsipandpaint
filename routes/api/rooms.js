const express = require("express");
const router = express.Router();
const Room = require('../../models/Room');


function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post("/new", (req,res) => {
  let room = new Room({
    host_id: req.body.userId,
    room_token: makeid(20)
  })

  room.save().then( () => {
    return res.json(room);
  })
})

router.get("/join", (req,res) => {
  // const room_token = req.body.room_token;
  console.log(req);
  Room.findOne({ room_token: req.body.room_token })
    .then(room => {
      if (room) {
        return res.json(room);
      } else {
        return res.status(404).json({ notfound: "Room not found" })
      }
    })
})

module.exports = router;
