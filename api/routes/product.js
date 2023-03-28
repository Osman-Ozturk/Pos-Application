import Product from "../models/ProductModel.js";
import express from "express";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(202).json(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/getId", async (req, res) => {
  try {
    const Product = await Product.findById(req.params.id);
    res.status(202).json(Product);
  } catch (error) {
    res.status(400).send(error);
  }
});
//! update
router.put("/update", async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//! delete
router.delete("/delete", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/getAll", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(202).json(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
