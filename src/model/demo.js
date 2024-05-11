import mongoose from "mongoose";


const demoSchema=new mongoose.Schema({
    name:String,
    image:String
})


export const Demo= mongoose.model("demo",demoSchema)