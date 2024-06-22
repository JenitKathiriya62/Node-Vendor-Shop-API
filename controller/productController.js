const Product = require("../models/productModel");
const categoryController = require("../controller/categoryController");
const storeController = require("../controller/storeController");

const addProduct = async (req, res) => {
  try {
    var arrImages = [];
    for (let i = 0; i < req.files.length; i++) {
      arrImages[i] = req.files[i].filename;
    }
    const product = new Product({
      vendor_id: req.body.vendor_id,
      store_id: req.body.store_id,
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      category_id: req.body.category_id,
      subcat_id: req.body.subcat_id,
      images: arrImages,
    });

    const productData = await product.save();
    return res
      .status(200)
      .send({ success: true, msg: "Products Data", data: productData });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    var send_data = [];
    var cat_data = await categoryController.get_categories();
    if (cat_data.length > 0) {
      for (let i = 0; i < cat_data.length; i++) {
        var product_data = [];
        var cat_id = cat_data[i]["_id"].toString();
        var cat_product = await Product.find({ category_id: cat_id });
        if (cat_product.length > 0) {
          for (let j = 0; j < cat_product.length; j++) {
            var store_data = await storeController.get_store(
              cat_product[j]["store_id"]
            );

            product_data.push({
              product_name: cat_product[j]["name"],
              images: cat_product[j]["images"],
              store_address: store_data["address"],
            });
          }
        }
        send_data.push({
          category: cat_data[i]["category"],
          product: product_data,
        });
      }

      res
        .status(200)
        .send({ success: true, msg: "Product Details", data: send_data });
    } else {
      return res
        .status(401)
        .send({ success: false, msg: "Product Details", data: send_data });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const searchProduct = async(req,res)=>{
  try {
    
      var search = req.body.search;
      var product_data= await Product.find({ "name":{$regex: ".*"+search+".*",$options:'i'}});
      if(product_data.length>0){
        res.status(200).send({success:true,msg:"Result",data:product_data});
      } else{
          res.status(200).send({success:false,msg:"Product Not Found"});
      }

  } catch (error) {
    return res.status(400).send(error.message);
    
  }
}
module.exports = {
  addProduct,
  getProduct,
  searchProduct,
};
