import { Employee } from '../model/employee';
import { Employment } from '../model/employment';
import { Attendance } from '../model/attendance';
import { Role } from '../model/role';
import express from 'express';
import authenticateToken from '../middleware/auth';

const router = express.Router();
// router.post('/new', authenticateToken ,async (req: express.Request, res: express.Response) => {

router.post('/new', async (req: express.Request, res: express.Response) => {
    try {
        const contactNo = await Employee.findOne({ employeeId: req.body.employeeId });
        await Employee.create(req.body);
        res.status(200).json({ message: "Employee Added Sucessfully" });
        // if (contactNo) {
        //     return res.status(400).json({ message: "Employee already exists" });
        // } else {
        //     await Employee.create(req.body);
        //     res.status(200).json({ message: "Employee Added Sucessfully" });

        // }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all employees
router.get('/all', async (req: express.Request, res: express.Response) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a specific employee
router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an employee
router.patch('/update_employees/:id', async (req: express.Request, res: express.Response) => {
    try {
        const EmployeeId = req.params.id;
        const updatedFields = req.body; // Updated fields will be present in the request body

        // Construct an object with the updated fields
        const updatedEmployeeFields: any = {};
        for (const key in updatedFields) {
            updatedEmployeeFields[key] = updatedFields[key];
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(EmployeeId, updatedEmployeeFields, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete an employee
router.delete('/delete_employees/:id', async (req: express.Request, res: express.Response) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const delteemployment = await Employment.findByIdAndRemove(employeeId);
        const deleteRole = await Role.findByIdAndRemove(employeeId);
        const deleteAttendance = await Attendance.findByIdAndRemove(employeeId);
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;