import { NextFunction, Request, Response } from 'express';
// import JWT from '../utils/JWT';

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
}
