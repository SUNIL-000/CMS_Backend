import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    require:true
  },
  userid: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  password: {
    type: String,
    require:true
  },
  role:{
    type: String,
    default:"admin",
    enum:["user","admin"]
  }
});

export const User=mongoose.model("User",Userschema)