
import { Fir } from "../model/fir.js";

export const newFir = async (req, res) => {
  try {
    const {
      name,
      adhaar,
      gender,
      age,
      panelcode,
      state,
      city,
      nationality,
      offence,
      caseno,
      bailstatus,
      jailterm,
    } =  await req.body;
   
    const newfir = await Fir.create({
      name,
      adhaar,
      gender,
      age,
      panelcode,
      state,
      city,
      nationality,
      offence,
      caseno,
      bailstatus,
      jailterm,
     
    });
    if (newfir == null) {
      console.log("no able to create")
      return res.json({
        success: false,
        message: "Failed to register Fir",
      });
    } else {
      console.log("Fir saved successfully")
      return res.status(201).json({
        success: true,
        message: "Fir saved successfully",
        
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while registering record",
    });
  }
};

////////////////update fir/////////////////
export const deleteFir = async (req, res) => {
  try {
    const { id } = req.params;

    const deletefir = await Fir.findByIdAndDelete(id);
    if (!deletefir) {
      return res.json({ success: false, message: "Record not found" });
    }

    return res.status(200).json({ success: true, message: "Record deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting record" });
  }
};


////////////GET ALL RECORD///////////////
export const allFir = async (req, res) => {
  try {
    const allFir = await Fir.find({});

    if (allFir == null) {
      return res.json({
        success: false,
        message: "Failed to getting result",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Record fetched successfully",
        allFir,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "error while getting record...",
    });
  }
};

/////////////UPDATE RECORD //////////////////
export const editFir = async (req, res) => {
  try {
    const { id } = await req.params;
    const {
      name,
      adhaar,
      gender,
      age,
      panelcode,
      state,
      city,
      nationality,
      offence,
      caseno,
      bailstatus,
      jailterm,
    } = await req.body;
    const editFir = await Fir.findByIdAndUpdate(id, {
      name,
      adhaar,
      gender,
      age,
      panelcode,
      state,
      city,
      nationality,
      offence,
      caseno,
      bailstatus,
      jailterm,
    });

    if (editFir == null) {
      // console.log(editFir);
      return res.json({
        success: false,
        message: "record not update",
       
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Record update successfully",
        editFir,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "error while updating record...",
    });
  }
};

/////////////SINGLE RECORD //////////////////
export const singleRecord = async (req, res) => {
  try {
    const { id } = await req.params;

    const singlefir = await Fir.findById(id);

    if (singlefir == null) {
      // console.log(editFir);
      return res.json({
        success: true,
        message: "record not found",
       
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Record Found",
        singlefir,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "error while fetching single record...",
    });
  }
};
export const searchRecord = async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }

    const fir = await Fir.find(query);

    if (!fir || fir.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No record found",
        fir: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `${fir.length} Record(s) found`,
      fir,
    });
  } catch (error) {
    console.error("Error while searching record:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};




