const express = require("express");
const storeRoute = express();
const bodyparser = require("body-parser");

storeRoute.use(bodyparser.json());
storeRoute.use(bodyparser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

storeRoute.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/storeimage"),
      function (error, sucess) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
   const name =  Date.now() + "-" + file.originalname;
    cb(null, name, function (error1, sucess1) {
      if (error1) throw error1;
    });
  },
});

const upload = multer({ storage: storage });

const storeController = require("../controller/storeController");
const auth=require("../middleware/auth");

storeRoute.post('/create-store',auth,upload.single('logo'),storeController.createStore);
storeRoute.post("/fine-nearest-store",auth,storeController.find_nearest_store);

module.exports = storeRoute;
