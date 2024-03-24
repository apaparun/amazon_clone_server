const express = require("express");
const admin = require("../middleware/admin_middleware");
const Product = require("../models/product");
const adminRouter = express.Router();

adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { name, description, quantity, images, category, price } = req.body;
    let product = new Product({
      name,
      description,
      quantity,
      images,
      category,
      price,
    });
    product = await product.save();
    console.log("product added", product);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;
