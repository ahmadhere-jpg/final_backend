import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  employeeId: { type: mongoose.Schema.Types.String, ref: 'Employee' },
  token:{
    type:String,
    required: true
  },
  imageUrl:{
    type:String,
    default:" "
  }
});

export const User = mongoose.model("User", schema);