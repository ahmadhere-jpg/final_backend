"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leave = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const leaveSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.String, ref: 'Employee' },
    leaveType: String,
    startDate: Date,
    endDate: Date,
    leaveStatus: String,
    reason: String,
});
exports.Leave = mongoose_1.default.model('Leave', leaveSchema);
//# sourceMappingURL=leave.js.map