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
const role_1 = require("../model/role");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.Role.find();
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield role_1.Role.create(req.body);
        res.status(201).json(newRole);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
router.put('/update_roles/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRole = yield role_1.Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRole);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
router.delete('/delete_roles/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield role_1.Role.findByIdAndDelete(req.params.id);
        res.json({ message: 'Role deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
module.exports = router;
//# sourceMappingURL=role.js.map