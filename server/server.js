//test
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.model");
const Project = require("./models/Project.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mass-recruitment-project");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: newPassword,
      name: req.body.name,
      phonenumber: req.body.phonenumber,
    });
    // res.send(user);
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/registerEmailTest", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.json({ status: "ok" });
  } else {
    return res.json({ status: "error", error: "Invalid email" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "error", error: "Invalid login" };
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (user) {
    const token = jwt.sign(
      { email: req.body.email, name: req.body.name },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else return res.json({ status: "error", user: false });
});

app.get("/api/projects", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    Project.find({}, (error, projects) => {
      console.log(projects);
      let projectArr = [];
      projects.forEach((pr) => {
        console.log("aaa" + pr);
        projectArr.push(pr);
      });
      // Object.entries(projects).map((project) => {
      //   projectArr.push(project);
      // });
      console.log("66" + projectArr);
      console.log("afafa");
      return res.json({ status: "ok", projects: projectArr });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/projects", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (user) {
      console.log("trying to update one", req.body);
      const data = await Project.create({
        titleProject: req.body.titleProject,
        idea: req.body.idea,
        video: req.body.video,
        pictures: {
          img_url: req.body.pictures,
          img_description: "NONE",
        },
        amount: req.body.amount,
      });
      console.log(data);
      return res.json({ status: "ok" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(1338, () => {
  console.log("Server started on 1338");
});
