const mongoose = require("mongoose");

const picture = new mongoose.Schema({
  img_url: String,
  img_description: String,
});
const Project = new mongoose.Schema(
  {
    idea: { type: String, required: true },
    video: { type: String, required: true },
    pictures: { type: [picture], required: true },
    amount: { type: Number, required: true },
  },
  { collection: "projects-data" }
);

const model = mongoose.model("ProjectData", Project);

module.exports = model;