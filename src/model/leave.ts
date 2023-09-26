import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.String, ref: 'Employee' },
    leaveType: String,
    startDate: Date,
    endDate: Date,
    leaveStatus: String,
    reason: String,
  });
export const Leave = mongoose.model('Leave',leaveSchema);