import mongoose from 'mongoose';

const employmentSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.String, ref: 'Employee' },
    roleName: { type: mongoose.Schema.Types.String, ref: 'Role' },
    department: String,
    supervisorId: { type: mongoose.Schema.Types.String, ref: 'Employee' },
    salary:Number
  });

export const Employment = mongoose.model('Employment',employmentSchema);