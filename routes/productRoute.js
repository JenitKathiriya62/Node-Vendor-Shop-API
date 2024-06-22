const express = require("express");
const productRoute = express();
const bodyparser = require("body-parser");

productRoute.use(bodyparser.json());
productRoute.use(bodyparser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

productRoute.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/productimage"),
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

const productController = require("../controller/productController");
const auth=require("../middleware/auth");

const checkMaxImages = (req, res, next) => {
  if (req.files && req.files.length > 5) {
    return res.status(400).json({ error: 'Maximum 5 images allowed' });
  }
  next();
};


productRoute.post('/add-product',auth,upload.array('images',5),checkMaxImages,productController.addProduct);
productRoute.get("/get-products",auth,productController.getProduct);
productRoute.get("/search-product",auth,productController.searchProduct)

module.exports = productRoute;
