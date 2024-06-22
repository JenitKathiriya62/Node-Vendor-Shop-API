const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const storeRoute = require("./routes/storeRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute= require("./routes/productRoute");
const commanRoute= require("./routes/commanRoute");

const app = express();
mongoose.connect("mongodb://localhost:27017/ECOM");

app.use("/api", userRoute);
app.use("/api", storeRoute);
app.use("/api", categoryRoute);
app.use("/api",productRoute);
app.use("/api",commanRoute);



app.listen(3000, function () {
  console.log("Server Running");
});
