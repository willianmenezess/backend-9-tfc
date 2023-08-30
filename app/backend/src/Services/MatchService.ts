import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import IMatch, { IMatchInput } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { NewEntity } from '../Interfaces';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
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

  public async updateMatch(id: IMatch['id'], matchInput: IMatchInput)
    : Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateMatch(id, matchInput);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(newMatch: NewEntity<IMatch>):
  Promise<ServiceResponse<IMatch | ServiceMessage>> {
    const { homeTeamId, awayTeamId } = newMatch;
    const arrayOfTeams = [homeTeamId, awayTeamId];
    const teamsAreEqual = homeTeamId === awayTeamId;
    const foundTeams = await Promise.all(arrayOfTeams.map((teamId) => {
      const team = this.teamModel.findById(teamId);
      return team;
    }));
    if (foundTeams.includes(null)) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    if (teamsAreEqual) {
      return { status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const matchCreated = await this.matchModel.create(newMatch);
    return { status: 'CREATED', data: matchCreated };
  }
}
