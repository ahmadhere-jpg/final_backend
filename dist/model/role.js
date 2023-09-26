"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roleSchema = new mongoose_1.default.Schema({
    roleName: String,
    permissions: Boolean
});
exports.Role = mongoose_1.default.model('Role', roleSchema);
//# sourceMappingURL=role.js.map