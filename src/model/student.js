import mongoose from "mongoose";

const student = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  roll: {
    type: Number,
    require: true,
  },
 
});

export const Student = mongoose.model("student", student);
