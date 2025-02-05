import { User } from "../model/user.js";

import bcrypt from "bcrypt";  // 🔹 Import bcrypt for password hashing

export const SignupController = async (req, res) => {
  try {
    const { name, userid, email, password, role } = req.body;

    // Check if user already exists
    const euser = await User.findOne({ userid });
    if (euser) {
      return res.json({ success: false, message: "User ID already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      userid,
      email,
      password: hashedPassword,  // Store hashed password
      role,
    });

    res.status(201).json({ success: true, message: "User created successfully, please login" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while creating user!!!", error });
  }
};


export const Login = async (req, res) => {
  try {
    const { userid, password } = req.body;

    const euser = await User.findOne({ userid });
    if (!euser) {
      return res.json({ success: false, message: "Please register first" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, euser.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Credential mismatch, login again" });
    }

    if (euser.role === "admin") {
      return res.json({ success: true, message: "Login successful", euser });
    } else {
      return res.json({ success: false, message: "Unable to login, contact admin" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error logging in", error });
  }
};


export const allUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    if (allUser == null) {
      return res.json({
        success: true,
        message: "Not Found",
      });
    } else {
      return res.json({
        success: true,
        message: "fetching all user",
        allUser,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error While fetching new user",
      error,
    });
  }
};
/////////make admin access///////
export const makeAdmin = async (req, res) => {
  try {
    const { id } = await req.params;
    const updateUser = await User.findById(id);
    if (updateUser == null) {
      return res.json({
        success: true,
        message: "Record Not Found",
      });
    } else {
      if (updateUser?.role == "admin") {
        return res.json({
          success: true,
          message: "You are already a admin",
        });
      } else {
        updateUser.role = "admin";
        updateUser.save();
        return res.json({
          success: true,
          message: "Update successfully...",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error While Updating user",
      error,
    });
  }
};

export const deleteUSer = async (req, res) => {
  try {
    const { id } = await req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser == null) {
      return res.json({
        success: false,
        message: "Record Not Found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Deleted successfully...",
        deletedUser,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error While Deleting user",
      error,
    });
  }
};
