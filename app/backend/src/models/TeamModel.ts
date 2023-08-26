// import { NewEntity } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const allTeamsData = await this.model.findAll();
    return allTeamsData;
  }

  public async findById(id: ITeam['id']): Promise<ITeam | null> {
    const teamData = await this.model.findByPk(id);
    if (!teamData) return null;
    return teamData;
  }
}
