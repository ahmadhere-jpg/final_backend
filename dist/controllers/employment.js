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
const employment_1 = require("../model/employment");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employments = yield employment_1.Employment.find()
            .populate('employeeId')
            .populate('roleName')
            .populate('supervisorId');
        res.json(employments);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield employment_1.Employment.findOne({
            employeeId: req.body.employeeId
        });
        if (existing) {
            return res.status(400).send('Employment record already exists for this employee');
        }
        const newEmployment = yield employment_1.Employment.create(req.body);
        const checkInTimestamp = Date.parse(req.body.startDate);
        const checkOutTimestamp = Date.parse(req.body.endDate);
        const contractduration = ((checkInTimestamp - checkOutTimestamp) / (1000 * 60 * 60 * 24));
        if (contractduration < 1) {
            res.status(400).send('Wrong contract duration');
        }
        res.status(201).json(newEmployment);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
router.put('/update_employments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEmployment = yield employment_1.Employment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployment);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
router.delete('/delete_employments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield employment_1.Employment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employment details deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
module.exports = router;
//# sourceMappingURL=employment.js.map