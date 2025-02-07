import express from "express";
import {
  allTherapies,
  getTherapy,
  createTherapy,
  updateTherapy,
  deleteTherapy,
} from "../controllers/therapyController.js";
import {
  allAppointments,
  singleAppointment,
  operationAppointment,
  adminCreate,
  adminLogin,
} from "../controllers/adminController.js";
import {
  singleFaq,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/faqController.js";
import dataModel from "../models/data.model.js";

//token and middleware
import { generateAdminToken } from "../utils/generateToken.js";
import { adminAuth } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//appointments
router.get("/appointments", adminAuth, allAppointments);

router.get("/appointments/:id", adminAuth, singleAppointment);

router.put("/appointments/:id", adminAuth, operationAppointment);

//therapies
router.get("/therapies", adminAuth, allTherapies);

router.get("/therapies/:id", adminAuth, getTherapy);

router.post("/therapies", adminAuth, createTherapy);

router.put("/therapies/:id", adminAuth, updateTherapy);

router.delete("/therapies/:id", adminAuth, deleteTherapy);

//data editable routes

router.put("/data", adminAuth, async (req, res) => {
  try {
    const { aboutTitle, aboutDescription } = req.body;

    const existingData = await dataModel.findOne();
    if (!existingData)
      return res.status(404).json({ message: "Data not found" });

    const updatedData = await dataModel.findByIdAndUpdate(
      existingData._id,
      {
        $set: {
          "about.aboutTitle": aboutTitle,
          "about.aboutDescription": aboutDescription,
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedData);
  } catch (err) {
    return res.status(500).json({
      message: "Error in updating data",
      error: err.message,
    });
  }
});

router.post("/create", adminCreate);

router.post("/login", adminLogin);

router.get("/logout", (req, res) => {
  res.clearCookie("adminToken");
  return res.status(200).json({ message: "Logged out successfully" });
});

//faq routes
//get single faq
router.get("/faq/:id", adminAuth, singleFaq);

// Create FAQ
router.post("/faq", adminAuth, createFaq);

// Update FAQ
router.put("/faq/:id", adminAuth, updateFaq);

// Delete FAQ
router.delete("/faq/:id", adminAuth, deleteFaq);

export default router;
