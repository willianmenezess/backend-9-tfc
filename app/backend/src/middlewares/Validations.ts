import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const MAX_PASSWORD_LENGTH = 6;
    if (password.length < MAX_PASSWORD_LENGTH) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const bearerToken = token.split(' ')[1] || token;
    const validToken = JWT.verify(bearerToken);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    req.body.userPayload = validToken;
    next();
  }
}
