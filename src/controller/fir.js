import { Fir } from '../model/fir.js';

// Create FIR Record
export const createFir = async (req, res) => {
  try {
    const fir = new Fir({
      State: req.body.State,
      District: req.body.District,
      PoliceStation: req.body.PoliceStation,
      FIRno: req.body.FIRno,
      Date: req.body.Date,
      Act1: req.body.Act1,
      Sections1: req.body.Sections1,
      NameOfSuspect: req.body.NameOfSuspect,
      OccurenceDay: req.body.OccurenceDay,
      OccurenceDate: req.body.OccurenceDate,
      OccurenceTime: req.body.OccurenceTime,
      DirectionAndDistncefromPS: req.body.DirectionAndDistncefromPS,
      Address: req.body.Address,
      ComplainantName: req.body.ComplainantName,
      ComplainantFatherorHusbandName: req.body.ComplainantFatherorHusbandName,
      ComplainantDateOfBirth: req.body.ComplainantDateOfBirth,
      ComplainantNationality: req.body.ComplainantNationality,
      ComplainantOccupation: req.body.ComplainantOccupation,
      ComplainantAadharNo: req.body.ComplainantAadharNo,
      ComplainantAddress: req.body.ComplainantAddress,
    });

    await fir.save();
    res.status(201).json({
      success: true,
      message: 'FIR record created successfully',
      fir,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all FIR Records
export const getAllFirs = async (req, res) => {
  try {
    const firs = await Fir.find();
    res.status(200).json({ success: true, firs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single FIR Record by ID
export const getFirById = async (req, res) => {
  try {
    const fir = await Fir.findById(req.params.id);
    if (!fir) {
      return res.status(404).json({ success: false, message: 'FIR not found' });
    }
    res.status(200).json({ success: true, fir });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search FIR Records
// Controller function for searching FIRs



// Update FIR Record
export const updateFir = async (req, res) => {
  const allowedFields = [
    'Act1',
    'Sections1',
    'NameOfSuspect',
    'Address',
    'ComplainantName',
    'ComplainantFatherorHusbandName',
    'ComplainantOccupation',
    'ComplainantAadharNo',
    'ComplainantAddress'
  ];

  const updates = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  try {
    const updatedFIR = await Fir.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ success: true, message: "FIR updated successfully" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update FIR' });
  }

};

// Delete FIR Record
export const deleteFir = async (req, res) => {
  try {
    const fir = await Fir.findByIdAndDelete(req.params.id);
    if (!fir) {
      return res.status(404).json({ success: false, message: 'FIR not found' });
    }
    res.status(200).json({
      success: true,
      message: 'FIR deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const searchFirs = async (req, res) => {
  try {
    const { ComplainantName, FIRno } = req.query;

    const query = {};
    if (ComplainantName) query.ComplainantName = { $regex: ComplainantName, $options: "i" };
    if (FIRno) query.FIRno = { $regex: FIRno, $options: "i" };

    const firs = await Fir.find(query);
    res.status(200).json({ success: true, firs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};