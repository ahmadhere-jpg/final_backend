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
const express_1 = __importDefault(require("express"));
const attendance_1 = require("../model/attendance");
const router = express_1.default.Router();
// Create attendance record
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceData = req.body; // Assuming the request body contains the attendance data
        const attendance = yield attendance_1.Attendance.create(attendanceData);
        res.status(201).json(attendance);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating attendance record' });
    }
}));
// Read attendance records
router.get('/read_attendance/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceRecords = yield attendance_1.Attendance.findById(req.params.id);
        res.status(200).json(attendanceRecords);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching attendance records' });
    }
}));
// Update attendance record
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = req.params.id;
        const updatedData = req.body;
        const updatedAttendance = yield attendance_1.Attendance.findByIdAndUpdate(attendanceId, updatedData, { new: true });
        res.status(200).json(updatedAttendance);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating attendance record' });
    }
}));
// Delete attendance record
router.delete('/delete_attendance/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = req.params.id;
        yield attendance_1.Attendance.findByIdAndDelete(attendanceId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting attendance record' });
    }
}));
module.exports = router;
//# sourceMappingURL=attendance.js.map