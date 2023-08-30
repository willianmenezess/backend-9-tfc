import IMatch, { IMatchInput } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { NewEntity } from '../Interfaces';

export default class IMatchModel {
  private model = SequelizeMatch;

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async findById(id: IMatch['id']): Promise<IMatch | null> {
    const match = await this.model.findOne({
      where: { id },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return match;
  }

  public async findByFilterProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async finishMatch(id: IMatch['id']): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateMatch(id: IMatch['id'], matchInput: IMatchInput): Promise<void> {
    await this.model.update(
      { homeTeamGoals: matchInput.homeTeamGoals, awayTeamGoals: matchInput.awayTeamGoals },
      { where: { id } },
    );
  }

  public async create(newMatch: NewEntity<IMatch>): Promise<IMatch> {
    const matchCreated = await this.model.create({ ...newMatch, inProgress: true });
    return matchCreated;
  }
}
