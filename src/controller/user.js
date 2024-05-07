import { User } from "../model/user.js";

export const SignupController = async (req, res) => {
  try {
    const { name, userid, email, password, role } = await req.body;

    const euser = await User.findOne({ userid: userid });
    console.log(euser);
    if (euser) {
      return res.json({
        success: true,
        message: "userid already registered...",
      });
    } else {
      const newuser = await User.create({
        name,
        userid,
        email,
        password,
        role,
      });
      await newuser.save();
      console.log(newuser);

      return res.status(201).json({
        success: true,
        message: "User created successfully...please login",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error While creating new user",
      error,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { userid, password } = await req.body;

    const euser = await User.findOne({ userid: userid });
    if (euser == null) {
      return res.json({
        success: false,
        message: "Please register first",
      });
    }
    console.log(euser);
    if (userid == euser.userid && password == euser.password) {
      if (euser.role == "admin") {
        return res.json({
          success: true,
          message: "Login successfully..",
          euser,
        });
      } else {
        return res.json({
          success: false,
          message: "Unable to Login .. Contact to admin first",
          
        });
      }
    } else if (userid != euser.userid || password != euser.password) {
      return res.json({
        success: false,
        message: "Credential mismatch login again..",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error While creating new user",
      error,
    });
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
