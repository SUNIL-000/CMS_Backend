import mongoose from "mongoose";

const FirSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  adhaar: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
    enum: ["male", "female"],
  },
  panelcode: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  nationality: {
    type: String,
    require: true,
  },
  offence: {
    type: String,
    require: true,
  },
  caseno: {
    type: String,
    require: true,
  },
  bailstatus: {
    type: String,
    require: true,
    enum: ["yes", "no"],
  },
  jailterm: {
    type: Number,
    require: true,
  },
 
});

export const Fir = mongoose.model("fir", FirSchema);
