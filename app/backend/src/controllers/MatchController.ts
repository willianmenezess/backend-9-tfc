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

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchService
      .updateMatch(Number(id), { homeTeamGoals, awayTeamGoals });
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const newMatch = req.body;
    const serviceResponse = await this.matchService
      .createMatch(newMatch);
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
