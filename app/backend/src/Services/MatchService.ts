import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(isInProgressFilter: string) {
    if (isInProgressFilter) {
      const isInProgress = isInProgressFilter === 'true';
      const inProgressMatches = await this.matchModel.findByFilterProgress(isInProgress);
      return { status: 'SUCCESSFUL', data: inProgressMatches };
    }
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
