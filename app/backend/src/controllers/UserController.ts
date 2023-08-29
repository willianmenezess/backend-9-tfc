import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.userPayload;
    const serviceResponse = await this.userService.getRole(email);
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
