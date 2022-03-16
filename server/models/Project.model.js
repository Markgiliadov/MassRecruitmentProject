const mongoose = require("mongoose");

const picture = new mongoose.Schema({
  img_url: String,
  img_description: String,
});
const Project = new mongoose.Schema(
  {
    titleProject: { type: String, required: true, unique: true },
    idea: { type: String, required: true },
    video: { type: String, required: true },
    pictures: { type: [picture], required: true },
    amountStart: { type: Number, required: true },
    amountEnd: { type: Number, required: true },
    endDate: { type: Date, require: true },
    createdDate: { type: Date, require: true },
    status: {
      type: String,
      enum: ["in-progress", "completed", "incomplete"],
      default: "in-progress",
    },
  },
  { collection: "projects-data" }
);

const model = mongoose.model("ProjectData", Project);

module.exports = model;
