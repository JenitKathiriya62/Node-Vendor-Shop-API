const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");

const createCategory = async (req, res) => {
  try {
    const category_data = await Category.find();
    if (category_data.length > 0) {
      let checking = false;
      for (let i = 0; i < category_data.length; i++) {
        if (category_data[i]["category"].toLowerCase() === req.body.category.toLowerCase()) {
            checking = true
            break;
        }
      }
      if(checking == false){
        const category = new Category({
            category: req.body.category,
          });
    
          const cat_data = await category.save();
          return res
            .status(200)
            .send({ success: true, msg: "Category", data: cat_data });
      }
      else{
        return res
        .status(200)
        .send({ success: true, msg: "This Category ("+req.body.category+") is already Added."});
      }
    } else {
      const category = new Category({
        category: req.body.category,
      });

      const cat_data = await category.save();
      return res
        .status(200)
        .send({ success: true, msg: "Category", data: cat_data });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const addSubCategory = async (req, res) => {
    try {
      const category_data = await SubCategory.find();
      if (category_data.length > 0) {
        let checking = false;
        for (let i = 0; i < category_data.length; i++) {
          if (category_data[i]["sub_category"].toLowerCase() === req.body.sub_category.toLowerCase()) {
              checking = true
              break;
          }
        }
        if(checking == false){
          const subcategory = new SubCategory({
            category_id:req.body.category_id,
            sub_category: req.body.sub_category,
            });
      
            const subcat_data = await subcategory.save();
            return res
              .status(200)
              .send({ success: true, msg: "Category", data: subcat_data });
        }
        else{
          return res
          .status(200)
          .send({ success: true, msg: "This Category ("+req.body.sub_category+") is already Added."});
        }
      } else {
        const subcategory = new SubCategory({
            category_id:req.body.category_id,
            sub_category: req.body.sub_category
            });
      
            const subcat_data = await subcategory.save();
            return res
              .status(200)
              .send({ success: true, msg: "Sub-Category", data: subcat_data });
        }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };

  const get_categories = async()=>{
    try {

      return Category.find();
      
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

module.exports = {
  createCategory,
  addSubCategory,
  get_categories
};
