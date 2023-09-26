"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Employee Information Schema
const employeeSchema = new mongoose_1.default.Schema({
    employeeId: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    contact: String,
    address: String,
    cnic: String,
    numberLeaves: Number,
    email: String,
    startDate: Date,
    endDate: Date,
    employmentStatus: String,
});
exports.Employee = mongoose_1.default.model('Employee', employeeSchema);
//# sourceMappingURL=employee.js.map