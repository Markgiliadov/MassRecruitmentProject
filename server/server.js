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
  try {
    console.log(req.body);
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: newPassword,
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      auth:
        req.body.auth === "Project Manager"
          ? "project_manager"
          : "Investor"
          ? "investor"
          : null,
    });
    // res.send(user);wwwwwwwww
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/registerEmailTest", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    console.log(user);
    return res.json({ status: "ok" });
  } else {
    return res.json({ status: "error", error: "Invalid email" });
  }
});

app.post("/api/login", async (req, res) => {
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
  if (isPasswordValid) {
    const token = jwt.sign(
      { email: req.body.email, name: req.body.name },
      "secret123"
    );
    return res.json({ status: "ok", user: token, auth: user.auth });
  } else return res.json({ status: "error", user: false });
});

app.get("/api/users", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (user.auth === "admin") {
      User.find({}, (error, users) => {
        let userArr = [];
        users.forEach((user) => {
          userArr.push(user);
        });
        return res.json({ status: "ok", users: userArr });
      });
    }
  } catch (error) {
    res.json({ status: "error", error: "Not an admin" });
  }
});

// app.get("/api/allData", async (req, res) => {
//   const token = req.headers["x-access-token"];
//   try {
//     let projectArr = [];
//     let userArr = [];
//     const decoded = jwt.verify(token, "secret123");
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });
//     if (user) {
//       await Project.find({}, (error, projects) => {
//         projects.forEach((pr) => {
//           projectArr.push(pr);
//         });
//       });
//       await User.find({}, (error, users) => {
//         users.forEach((user) => {
//           userArr.push(user);
//         });
//       })
//         .clone()
//         .catch((err) => console.log(err));

//       if (user.auth === "admin")
//         return res.json({ status: "ok", projects: projectArr, users: userArr });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

// app.post("/api/projects", async (req, res) => {
//   const token = req.headers["x-access-token"];
//   try {
//     const decoded = jwt.verify(token, "secret123");
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });
//     if (user) {
//       const data = await Project.create({
//         titleProject: req.body.titleProject,
//         idea: req.body.idea,
//         video: req.body.video,
//         pictures: {
//           img_url: req.body.pictures,
//           img_description: "NONE",
//         },
//         amount: req.body.amount,
//       });
//       return res.json({ status: "ok" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

app.get("/api/projects", async (req, res) => {
  // const token = req.headers["x-access-token"];
  const projectType = req.get("Project-Type");
  console.log(projectType);
  try {
    // const decoded = jwt.verify(token, "secret123");
    // const email = decoded.email;
    // const user = await User.findOne({ email: email });
    Project.find({ status: projectType }, (error, projects) => {
      let projectArr = [];
      projects.forEach((pr) => {
        projectArr.push(pr);
      });
      return res.json({ status: "ok", projects: projectArr });
    });
  } catch (error) {
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
      console.log("endDate: " + req.body.endDate);
      const data = await Project.create({
        titleProject: req.body.titleProject,
        idea: req.body.idea,
        video: req.body.video,
        pictures: {
          img_url: req.body.pictures,
          img_description: "NONE",
        },
        amountStart: req.body.amountStart,
        amountEnd: req.body.amountEnd,
        createdDate: req.body.createdDate,
        endDate: req.body.endDate,
      });
      return res.json({ status: "ok" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
app.put("/api/projects", async (req, res) => {
  // const token = req.headers["x-access-token"];
  try {
    // const decoded = jwt.verify(token, "secret123");
    // const email = decoded.email;
    // const user = await User.findOne({ email: email });
    // if (user) {
    await Project.findOneAndUpdate(
      { titleProject: req.body.titleProject },
      { $set: { amountStart: req.body.newAmount } },
      () => {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    );
    return res.json({ status: "ok" });
    // }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
app.listen(1338, () => {
  console.log("Server started on 1338");
});
