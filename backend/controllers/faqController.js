import FaqModel from "../models/faq.model.js";

export const allFaq = async (req, res) => {
  try {
    const faq = await FaqModel.find();
    return res.status(200).json(faq);
  } catch (err) {
    return res.status(500).json({
      message: "Cannot fetch data",
      err: err.message,
    });
  }
};

export const singleFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await FaqModel.findById(id);
    return res.status(200).json(faq);
  } catch (err) {
    return res.status(500).json({
      message: "Cannot fetch data",
      err: err.message,
    });
  }
};

export const createFaq = async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer)
    return res.status(404).json({
      message: "Please fill all the fields",
    });
  try {
    const faq = await FaqModel.create({
      question,
      answer,
    });
    return res.status(201).json({
      message: "Data created successfully",
      data: faq,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in creating request",
      err: err.message,
    });
  }
};

export const updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const faq = await FaqModel.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    return res.status(200).json({
      message: "Data updated successfully",
      data: faq,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in updating data",
      err: err.message,
    });
  }
};

export const deleteFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await FaqModel.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Error in deleting data",
      err: err.message,
    });
  }
};
