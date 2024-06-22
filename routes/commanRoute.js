const express = require("express");
const commanRoute = express();

const bodyparser = require("body-parser");

commanRoute.use(bodyparser.json());
commanRoute.use(bodyparser.urlencoded({ extended: true }));

const commanController = require("../controller/commanController");
const auth=require("../middleware/auth");

commanRoute.get("/data-count",auth,commanController.data_count)
module.exports = commanRoute;
