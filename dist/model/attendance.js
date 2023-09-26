"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.String, ref: 'Employee' },
    date: Date,
    checkInTime: Date,
    checkOutTime: Date,
});
exports.Attendance = mongoose_1.default.model('Attendance', attendanceSchema);
//# sourceMappingURL=attendance.js.map