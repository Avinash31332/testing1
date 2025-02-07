import express from "express";
import { allFaq } from "../controllers/faqController.js";
import dataModel from "../models/data.model.js";
const router = express.Router();

//editable routes
router.get("/data", async (req, res) => {
  try {
    const aboutData = await dataModel.findOne();
    return res.status(200).json(aboutData);
  } catch (err) {
    return res.status(500).json({
      message: "Error in fetching data",
      error: err,
    });
  }
});

// Get all FAQs
router.get("/faq", allFaq);

export default router;
