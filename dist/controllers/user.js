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
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../middleware/error"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const router = express_1.default.Router();
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email }).select("+password");
        if (!user)
            return next(new error_1.default("Invalid Email or Password", 400));
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return next(new error_1.default("Invalid Email or Password", 400));
        const token = user.token;
        res.status(200).json({
            token
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post("/new", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, name, email, password } = req.body;
        let user = yield user_1.User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "Employee already exists" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const token = jsonwebtoken_1.default.sign({ id: email }, index_1.SECRET_KEY);
        user = yield user_1.User.create({ name, email, password: hashedPassword, employeeId, token });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/logout", (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
        expires: new Date(Date.now()),
    })
        .json({
        success: true,
    });
});
router.get("/protected", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, index_1.SECRET_KEY);
        if (!decoded.id) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = yield user_1.User.findOne({ email: decoded.id }); // Assuming you are using a MongoDB-like database
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.email }, index_1.SECRET_KEY);
        return res.status(200).json({ refreshToken }); // Return the refreshToken or any other data as needed
    }
    catch (err) {
        // Handle errors, e.g., invalid token or database errors
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
//# sourceMappingURL=user.js.map