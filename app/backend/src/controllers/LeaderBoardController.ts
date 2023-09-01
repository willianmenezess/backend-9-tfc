import { Request, Response } from 'express';
import LeaderBoardService from '../Services/LeaderBoardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async getPerformanceTeamsHome(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderBoardService.getPerformanceTeamsHome();
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getPerformanceTeamsAway(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderBoardService.getPerformanceTeamsAway();
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
