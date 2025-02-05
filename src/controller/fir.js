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
    } = await req.body;
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
      return res.json({
        success: false,
        message: "Failed to register record",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Record saved successfully",
        newfir,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "error while creating record...",
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
    const { adhaar } = req.query;
    const fir = await Fir.find({ adhaar });   
    if (fir.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No record found",
      });
    }

    // If records are found
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

