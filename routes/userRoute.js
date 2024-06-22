const express = require("express");
const userRoute = express();
const bodyparser = require("body-parser");

userRoute.use(bodyparser.json());
userRoute.use(bodyparser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

userRoute.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/images"),
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

const userController = require("../controller/userController");
const auth=require("../middleware/auth");

userRoute.post("/register",upload.single("image"),userController.registerUser);
userRoute.post("/login",userController.loginUser);
userRoute.post("/update-password",auth,userController.updatePassword);


module.exports = userRoute;