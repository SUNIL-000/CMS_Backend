import { mongoose } from "mongoose";
const missingPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date_missing: {
    type: Date,
    required: true,
  },
  reported_by: {
    name: {
      type: String,
    //   required: true,
    },
    contact: {
      type: String,
    //   required: true,
    },
  },
  status: {
    type: String,
    enum: ["missing", "found", "resolved"],
    default:"missing",
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
});

export const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);

