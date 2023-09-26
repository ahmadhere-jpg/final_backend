import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName: String,
    permissions: Boolean
})

export const Role = mongoose.model('Role',roleSchema);