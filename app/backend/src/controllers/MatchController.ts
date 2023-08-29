import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.getAllMatches(inProgress as string);
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  // public async getMatchProgress(req: Request, res: Response): Promise<Response> {
  //   const { query } = req;
  //   const isProgress = query.progress === 'true';
  //   const serviceResponse = await this.matchService.getMatchProgress(isProgress);
  //   const { status, data } = serviceResponse;
  //   return res.status(mapStatusHTTP(status)).json(data);
  // }
}
