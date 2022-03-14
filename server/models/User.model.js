const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    name: { type: String, required: true },
    phonenumber: { type: String, required: true },
    auth: {
      type: String,
      enum: ["admin", "investor", "project_manager"],
      default: "investor",
    },
    projects: { type: String, required: false },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
