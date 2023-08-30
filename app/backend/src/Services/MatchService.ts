import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(isInProgressFilter: string): Promise<ServiceResponse<IMatch[]>> {
    if (isInProgressFilter) {
      const isInProgress = isInProgressFilter === 'true';
      const inProgressMatches = await this.matchModel.findByFilterProgress(isInProgress);
      return { status: 'SUCCESSFUL', data: inProgressMatches };
    }
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: IMatch['id']): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
