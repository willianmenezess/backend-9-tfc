import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchService.getAllMatches();
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
