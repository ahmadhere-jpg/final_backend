import { User } from "../model/user";
import bcrypt from "bcrypt";
import ErrorHandler from "../middleware/error";
import { Request, Response, NextFunction } from "express";
import express from "express";
import jwt,{JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from "../index";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/login",async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));
    const token = user.token;
    res.status(200).json({
      token
    })
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { employeeId, name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({id:email}, SECRET_KEY, { expiresIn:'20m' });

    user = await User.create({ name, email, password: hashedPassword, employeeId , token});
    res.json({message:"Created"})
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
    });
});

router.get("/protected", async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded  = jwt.verify(token, SECRET_KEY) as JwtPayload;
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.id}); // Assuming you are using a MongoDB-like database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const refreshToken = jwt.sign({ id: user.email }, SECRET_KEY);
    return res.status(200).json({ refreshToken }); // Return the refreshToken or any other data as needed
  } catch (err) {
    // Handle errors, e.g., invalid token or database errors
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.patch('/:userId',authenticateToken, async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
