import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/companydb")
  .then(db => console.log("DB is connected"))
  .catch(error => console.log(error));