import { ICRUDModelCreator } from '../ICRUDModel';
import IMatch, { IMatchInput } from './IMatch';

export interface IMatchModel extends ICRUDModelCreator<IMatch> {
  findAll(): Promise<IMatch[]>
  findByFilterProgress(query: boolean): Promise<IMatch[]>
  finishMatch(id: number): Promise<void>
  updateMatch(id: IMatch['id'], matchInput: IMatchInput): Promise<void>
}
