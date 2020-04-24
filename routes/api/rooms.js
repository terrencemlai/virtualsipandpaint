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
  Room.findOne({ room_token: req.query.roomtoken })
    .then(room => {
      if (room) {
        return res.json(room);
      } else {
        return res.status(404).json({ notfound: "Room not found" })
      }
    })
})


router.get("/:id", (req,res) => {
  Room.find({ _id: req.params.id })
    .then(room => {
      if (room) {
        return res.json(room);
      } else {
        return res.status(404).json({ notfound: "Room not found" })
      }
    })
})




module.exports = router;
