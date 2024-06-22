const express = require('express');
const categoryRoute = express();
const bodyparser = require('body-parser');

categoryRoute.use(bodyparser.json());
categoryRoute.use(bodyparser.urlencoded({extended:true}));

const categoryController = require("../controller/categoryController");
const auth=require("../middleware/auth");

categoryRoute.post('/add-category',auth,categoryController.createCategory);
categoryRoute.post('/add-sub-category',auth,categoryController.addSubCategory);

module.exports = categoryRoute;
