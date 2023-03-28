import Bill from "../models/BillModel.js";
import express from "express";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newBill = await Bill.create(req.body);
    res.status(202).json(newBill);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/getId", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.status(202).json(bill);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const bills = await Bill.find({});
    res.status(202).json(bills);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
