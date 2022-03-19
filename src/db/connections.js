const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/devtest", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connected Sucessfully");
  })
  .catch((e) => {
    console.log("Mongo not connected" + e);
  });
