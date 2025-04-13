import mongoose from 'mongoose';

const FirSchema = new mongoose.Schema({
  State: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  PoliceStation: {
    type: String,
    required: true,
  },
  FIRno: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Act1: {
    type: String,
    required: true,
  },
  Sections1: {
    type: String,
    required: true,
  },
  NameOfSuspect: {
    type: String,
    required: true,
  },
  OccurenceDay: {
    type: String,
    required: true,
  },
  OccurenceDate: {
    type: Date,
    required: true,
  },
  OccurenceTime: {
    type: String,
    required: true,
  },
  DirectionAndDistncefromPS: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  ComplainantName: {
    type: String,
    required: true,
  },
  ComplainantFatherorHusbandName: {
    type: String,
    required: true,
  },
  ComplainantDateOfBirth: {
    type: Date,
    required: true,
  },
  ComplainantNationality: {
    type: String,
    required: true,
  },
  ComplainantOccupation: {
    type: String,
    required: true,
  },
  ComplainantAadharNo: {
    type: String,
    required: true,
  },
  ComplainantAddress: {
    type: String,
    required: true,
  },
});

export const Fir = mongoose.model('Fir', FirSchema);
