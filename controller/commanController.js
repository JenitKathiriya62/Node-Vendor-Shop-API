const Product = require("../models/productModel");
const User = require("../models/usermodel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");

const data_count = async (req, res) => {
  try {

        const count_data=[];
        const product_data = await Product.find().count();
        const vendor_data = await User.find({type:1}).count();
        const category_data = await Category.find().count();
        const subCategory_data = await SubCategory.find().count();

        count_data.push({
            product:product_data,
            vendor:vendor_data,
            category:category_data,
            subCategory:subCategory_data
        });
        return res.status(200).send({success:true,msg:"Couniting Data",data:count_data});

  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  data_count,
};
