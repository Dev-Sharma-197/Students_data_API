const express = require("express");
const app = express();
require("./db/connections");
const Student = require("./models/students");
const port = process.env.PORT || 8000;

app.use(express.json());

// Adding Student Data to the Mongo DataBase
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const uData = await user.save();
    res.status(201).send(uData);
  } catch (e) {
    res.status(400).send("OOPS" + e);
  }
});

// Searching whole database
app.get("/students", async (req, res) => {
  try {
    const uData = await Student.find();
    res.status(200).send(uData);
  } catch (e) {
    res.status(500).send("OPPS" + e);
  }
});

// Searching whole database
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const uData = await Student.find({ _id });
    res.status(200).send(uData);
  } catch (e) {
    res.status(500).send("OPPS" + e);
  }
});

// Searching by name from database (but name should be single worded)
app.get("/students/:name", async (req, res) => {
  try {
    const uname = req.params.name;
    const uData = await Student.find({
      name: { $regex: uname, $options: "$i" },
    });
    console.log(uData);
    res.status(200).send(uData);
  } catch (e) {
    res.status(500).send("OPPS " + e);
  }
});

// deleting individual's data by id
app.delete("/students/:id", async (req, res) => {
  try {
    const uData = await Student.findByIdAndDelete(req.params.id);
    res.status(200).send(uData);
  } catch (e) {
    res.status(500).send(e);
  }
});

// updating individual's some data part with id
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const uData = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(uData);
  } catch (e) {
    res.status(500).send(e);
  }
});

// updating individual's data part with id
app.put("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const uData = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(uData);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
