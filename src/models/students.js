const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Email id already present"],
    validator(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid Email");
    },
  },
  phone: {
    type: Number,
    min: 10,
    require: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
});

// now we will creat a new collection
const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
