import { Request, Response } from 'express';
import TeamService from '../Services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.teamService.getAllTeams();
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getTeamById(Number(id));
    const { status, data } = serviceResponse;
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
