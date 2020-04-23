const express = require("express");
const router = express.Router();
const Artwork = require('../../models/Artwork');


router.post("/new", (req,res) => {
  let artwork = new Artwork({
    user_id: req.body.userId,
    data_url: req.body.dataUrl,
  })


  artwork.save().then( () => {
    Artwork.find({user_id: artwork.user_id }).then((artworks) => {
      return res.json(artworks);
    })
  })
})

router.get("/index", (req,res) => {
    Artwork.find({ user_id: req.query.userId })
    .then(artworks => {
      if (artworks) {
        return res.json(artworks);
      } else {
        return res.status(404).json({ notfound: "No Artworks Found for User" })
      }
    })
})

module.exports = router;
