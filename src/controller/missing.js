import { uploadToCloudinary } from "../cloudinary/cloudinary.js";
import { MissingPerson } from "../model/missingPerson.js";

// Create a new missing person record
export const createMissingPerson = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      city,
      missing_date,
      reported_by_name,
      reported_by_contact,
      status,
    } = req.body;

    console.log(req.body);
    console.log(req.file);

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a photo",
      });
    }

    // Upload Image to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(req.file.path);
    if (!cloudinaryResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }

    // Validate Required Fields
    if (!name || !age || !gender || !city || !missing_date || !reported_by_name || !reported_by_contact || !status) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    // Create New Missing Person Record
    const newMissingPerson = new MissingPerson({
      name,
      age,
      gender,
      city,
      missing_date,
      reported_by_name,
      reported_by_contact,
      status,
      photo_url: cloudinaryResponse.url || "",
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
      success: false,
      message: "An error occurred while creating the missing person record",
    });
  }
};
//////UPDATE SINGLE RECORD //////
export const updateMissingPerson = async (req, res) => {
  try {
    console.log("update")
    const {
      name,
      age,
      gender,
      city,
      missing_date,
      reported_by_name,
      reported_by_contact,
      status,
    } = req.body;
    const { id } = req.params;
    console.log(id);

    console.log(
      name,
      age,
      gender,
      city,
      missing_date,
      reported_by_name,
      reported_by_contact,
      status
    );



    const updateMissingPerson = await MissingPerson.findByIdAndUpdate(id, {
      name,
      age,
      gender,
      city,
      missing_date,
      reported_by_name,
      reported_by_contact,
      status,
    });

    await updateMissingPerson.save();

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
    });
  } catch (error) {
    console.error("Error while updating missing person record:", error);
    res.status(500).json({
      message: "An error occurred while updating missing person record",
    });
  }
};

// Get all missing person records
export const getAllMissingPersons = async (req, res) => {
  try {
    const missingPersons = await MissingPerson.find();
    if (!missingPersons) {
      return res.status(404).json({
        success: false,
        message: "No record found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All missing record found",
      missingPersons,
    });
  } catch (error) {
    console.error("Error getting missing person records:", error);
    res.status(500).json({
      message: "An error occurred while getting missing person records",
    });
  }
};

export const getSingleMissingPersons = async (req, res) => {
  try {
    const { id } = req.params;
    const missingPersons = await MissingPerson.findById(id);
    if (!missingPersons) {
      return res.status(404).json({
        success: false,
        message: "No record found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All missing record found",
      missingPersons,
    });
  } catch (error) {
    console.error("Error getting missing person records:", error);
    res.status(500).json({
      message: "An error occurred while getting missing person records",
    });
  }
};
export const deleteSingleMissingPersons = async (req, res) => {
  try {
    const { id } = req.params;
    const missingPersons = await MissingPerson.findByIdAndDelete(id);
    if (!missingPersons) {
      return res.status(404).json({
        success: false,
        message: "No record found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error("Error getting missing person records:", error);
    res.status(500).json({
      message: "An error occurred while deleting missing person records",
    });
  }
};
