import { MissingPerson } from "../model/missingPerson.js";

// Create a new missing person record
export const createMissingPerson = async (req, res) => {
    try {
      const { name, age, gender, city, date_missing, reported_by, status } = req.body;
      const { photo } = req.files || {}; 
      if (!photo) {
        return res.json({
          success: false,
          message: "Please upload a photo",
        });
      }
  
      if (!name || !age || !gender || !city) {
        rm(photo.path, () => {
          console.log("Photo deleted");
        });
        return res.json({
          success: false,
          message: "Please fill all the required fields",
        });
      }
  
      const newMissingPerson = new MissingPerson({
        name,
        age,
        gender,
        city,
        date_missing,
        reported_by,
        status,
        photo: photo.path,
      });
  
      await newMissingPerson.save();
  
      res.status(201).json({
        success: true,
        message: "Missing person record created successfully",
        newMissingPerson,
      });
    } catch (error) {
      console.error("Error creating missing person record:", error);
      res.status(500).json({
        message: "An error occurred while creating missing person record",
      });
    }
  };
  

// Get all missing person records
export const getAllMissingPersons = async (req, res) => {
  try {
    const missingPersons = await MissingPerson.find();
    res.status(200).json({
      success: true,
      message: "All miisng record found",
      data: missingPersons,
    });
  } catch (error) {
    console.error("Error getting missing person records:", error);
    res.status(500).json({
      message: "An error occurred while getting missing person records",
    });
  }
};
