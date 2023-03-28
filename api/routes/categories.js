import Category from "../models/CategoryModel.js";
import express from "express";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(202).json(newCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/getId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(202).json(category);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/getAll", async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(202).json(categorys);
  } catch (error) {
    res.status(400).send(error);
  }
});
//! update
router.put("/update", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/delete", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});
export default router;
