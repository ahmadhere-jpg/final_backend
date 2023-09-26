"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_1 = require("../model/attendance");
const employee_1 = require("../model/employee");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/leaves/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, date, checkInTime, checkOutTime } = req.body;
        const checkInTimestamp = Date.parse(checkInTime);
        const checkOutTimestamp = Date.parse(checkOutTime);
        // Calculate the difference in milliseconds
        const timeDifferenceMs = checkOutTimestamp - checkInTimestamp;
        // Calculate the duration in hours
        const durationInHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
        // Find the employee by ID
        const employee = yield employee_1.Employee.findOne(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // Calculate the number of leaves to deduct based on attendance duration
        const leavesToDeduct = durationInHours;
        // Check if the leave balance is sufficient
        if (employee.numberLeaves >= leavesToDeduct) {
            // Create the attendance record
            const newAttendance = yield attendance_1.Attendance.create(req.body);
            // Update the employee's leave balance
            employee.numberLeaves -= leavesToDeduct;
            yield employee.save();
            res.status(201).json({
                message: 'Attendance recorded and leaves deducted successfully',
                attendance: newAttendance,
                updatedEmployee: employee,
            });
        }
        else {
            res.status(400).json({
                message: employee.numberLeaves,
                attendance: durationInHours
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
module.exports = router;
//# sourceMappingURL=leave.js.map