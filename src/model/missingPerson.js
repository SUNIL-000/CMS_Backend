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
    enum: ["male", "female", "other"],
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
  reported_by_name: {
    type: String,
    required: true,
  },
  reported_by_contact: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["missing", "found", "resolved"],
    default: "missing",
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
});

export const MissingPerson = mongoose.model(
  "MissingPerson",
  missingPersonSchema
);
