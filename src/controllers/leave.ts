import { Attendance } from '../model/attendance';
import { Employee } from '../model/employee'
import express from 'express'

const router = express.Router();

router.post('/leaves/new', async (req: express.Request, res: express.Response) => {
    try {
        const { employeeId, date, checkInTime, checkOutTime } = req.body;

        const checkInTimestamp = Date.parse(checkInTime);
        const checkOutTimestamp = Date.parse(checkOutTime);

        // Calculate the difference in milliseconds
        const timeDifferenceMs = checkOutTimestamp - checkInTimestamp;

        // Calculate the duration in hours
        const durationInHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
        // Find the employee by ID
        const employee = await Employee.findOne(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Calculate the number of leaves to deduct based on attendance duration
        const leavesToDeduct = durationInHours;

        // Check if the leave balance is sufficient
        if (employee.numberLeaves >= leavesToDeduct) {
            // Create the attendance record
            const newAttendance = await Attendance.create(req.body);

            // Update the employee's leave balance
            employee.numberLeaves -= leavesToDeduct;
            await employee.save();

            res.status(201).json({
                message: 'Attendance recorded and leaves deducted successfully',
                attendance: newAttendance,
                updatedEmployee: employee,
            });
        } else {
            res.status(400).json({
                message: employee.numberLeaves,
                attendance: durationInHours
            });
        }
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});



module.exports = router;