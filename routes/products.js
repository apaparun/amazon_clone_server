const express = require("express");
const auth = require("../middleware/auth_middleware");
const { Product } = require("../models/product");
const productRouter = express.Router();

productRouter.get("/api/products", auth, async (req, res) => {
  try {
    const product = await Product.find({ category: req.query.category });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//search products
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const product = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = productRouter;
