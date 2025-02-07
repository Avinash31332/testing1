import express from "express";
import { allFaq } from "../controllers/faqController.js";
const router = express.Router();

// Get all FAQs
router.get("/faq", allFaq);

export default router;
