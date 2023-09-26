import mongoose from "mongoose";
// Employee Information Schema
const employeeSchema = new mongoose.Schema({
  employeeId:String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  contact: String,
  address: String,
  cnic: String,
  numberLeaves:Number,
  email:String,
  startDate: Date,
  endDate: Date,
  employmentStatus: String,
});
export const Employee = mongoose.model('Employee', employeeSchema);