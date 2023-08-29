import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

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

  public async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findOne({
      where: { id },
      include: [
        { model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' },
      ],
    });
    return match;
  }

  // public async findByQuery(query: string): Promise<IMatch[]> {
  //   const matches = await this.model.findAll({
  //     where: query as unknown as Record<string, string>,
  //     include: [
  //       { model: SequelizeTeam, as: 'homeTeam' },
  //       { model: SequelizeTeam, as: 'awayTeam' },
  //     ],
  //   });
  //   return matches;
  // }
}
