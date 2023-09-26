"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.SECRET_KEY = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const AttendanceRouter = require('./controllers/attendance');
const EmpRouter = require('./controllers/employee');
const userRouter = require('./controllers/user');
const employementRouter = require('./controllers/employment');
const LeavesRouter = require('./controllers/leave');
const roleRouter = require('./controllers/role');
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    credentials: true,
}));
exports.SECRET_KEY = 'your-secret-key-here';
exports.app.use((0, compression_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use('/attendance', AttendanceRouter);
exports.app.use('/employee', EmpRouter);
exports.app.use('/user', userRouter);
exports.app.use('/employement', employementRouter);
exports.app.use('/leaves', LeavesRouter);
exports.app.use('/role', roleRouter);
exports.server = http_1.default.createServer(exports.app);
const MONGO_URL = 'mongodb+srv://Hassan:Hassan12@cluster0.bwnuxit.mongodb.net/?retryWrites=true&w=majority'; // DB URI
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('error', (error) => console.log(error));
exports.server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});
//# sourceMappingURL=index.js.map