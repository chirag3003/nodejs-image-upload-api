const express = require("express");
const router = express.Router();
const API = require("../../package.json");

router.get("/", (req, res) => {
  res.json([
    {
      name: API.name,
      version: API.version,
      description: API.description,
    },
  ]);
});

router.use("/cfi", require("./cf-images"));
// router.use("/test", require("./test"));

module.exports = router;
