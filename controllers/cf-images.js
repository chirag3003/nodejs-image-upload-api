const express = require("express");
const router = express.Router();
const multer = require("multer");
var axios = require("axios");
var FormData = require("form-data");
require("dotenv").config();
const upload = multer({ storage: multer.memoryStorage() });
var type = upload.single("image");

router.post("/", type, async (req, res) => {
  console.log(req.file);
  var data = new FormData();
  data.append("file", req.file.buffer);

  var config = {
    method: "post",
    url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACC_ID}/images/v1`,
    headers: {
      Authorization: `Bearer ${process.env.CF_TOKEN}`,
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.send(error);
    });
});

module.exports = router;
