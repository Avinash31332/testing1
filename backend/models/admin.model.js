import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const admin = mongoose.model("admin", adminSchema);

export default admin;
