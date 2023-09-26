import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.String, ref: 'Employee' },
    date: Date,
    checkInTime: Date,
    checkOutTime: Date,
  });

export const Attendance = mongoose.model('Attendance',attendanceSchema);