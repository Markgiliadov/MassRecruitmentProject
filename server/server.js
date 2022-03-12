//test
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.model");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mass-recruitment-project");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      email: req.body.email,
      password: req.body.password,
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

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      { email: req.body.email, name: req.body.name },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else return res.json({ status: "error", user: false });
});

app.listen(1338, () => {
  console.log("server started 1338");
});
