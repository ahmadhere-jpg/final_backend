import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../index'
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: Token missing' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(403).json({ message: 'Authentication failed: Token invalid' });
  }
}


export default authenticateToken;
