//imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//import from another files
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/products");
//init
const PORT = 3000;
const app = express();
const DB = `mongodb+srv://${process.env.mDBUserName}:${process.env.mDBPassword}@cluster0.ckb3ub3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
//db connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log(`db connstion error ${e}`);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
