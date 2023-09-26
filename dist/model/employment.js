"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const employmentSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.String, ref: 'Employee' },
    roleName: { type: mongoose_1.default.Schema.Types.String, ref: 'Role' },
    department: String,
    supervisorId: { type: mongoose_1.default.Schema.Types.String, ref: 'Employee' },
    salary: Number
});
exports.Employment = mongoose_1.default.model('Employment', employmentSchema);
//# sourceMappingURL=employment.js.map