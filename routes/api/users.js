const express = require("express");
const router = express.Router();


router.get("/test", (req, res) => {
  res.json({message: "this is the users route"});
});


module.exports = router;