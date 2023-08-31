import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatchFromDB } from '../Interfaces/matches/IMatch';
import IPerformance from '../Interfaces/leaderBoard/IPerformance';
import ITeam from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderBoardService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  static goalsFavor(teamMatches: IMatchFromDB[], teamName: string) {
    const totalGoalsFavor = teamMatches
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam.teamName === teamName) return acc + homeTeamGoals;
        return acc + awayTeamGoals;
      }, 0);
    return totalGoalsFavor;
  }

  static goalsOwn(teamMatches: IMatchFromDB[], teamName: string) {
    const totalGoalsOwn = teamMatches
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam.teamName === teamName) return acc + awayTeamGoals;
        return acc + homeTeamGoals;
      }, 0);
    return totalGoalsOwn;
  }

  static generateTeam(
    teamName: string,
    teamMatches:IMatchFromDB[],
    wins: IMatchFromDB[],
    draws: IMatchFromDB[],
  ) {
    return { name: teamName,
      totalPoints: wins.length * 3 + draws.length,
      totalGames: teamMatches.length,
      totalVictories: wins.length,
      totalDraws: draws.length,
      totalLosses: teamMatches.length - wins.length - draws.length,
      goalsFavor: LeaderBoardService.goalsFavor(teamMatches, teamName),
      goalsOwn: LeaderBoardService.goalsOwn(teamMatches, teamName),
    };
  }

  public async getPerformanceTeamsHome(): Promise<ServiceResponse<IPerformance[]>> {
    const getAllTeams = await this.teamModel.findAll() as ITeam[];
    const getAllMatches = await this.matchModel.findAll() as IMatchFromDB[];
    const allMatchesFinished = getAllMatches.filter(({ inProgress }) => !inProgress);
    const performanceOfTeams = getAllTeams.map(({ teamName }) => {
      const teamMatches = allMatchesFinished.filter(({ homeTeam }) =>
        homeTeam.teamName === teamName);
      const wins = teamMatches
        .filter(({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals > awayTeamGoals);
      const draws = teamMatches.filter(({ homeTeamGoals, awayTeamGoals }) =>
        homeTeamGoals === awayTeamGoals);
      return LeaderBoardService.generateTeam(teamName, teamMatches, wins, draws);
    });
    return { status: 'SUCCESSFUL', data: performanceOfTeams };
  }
}
