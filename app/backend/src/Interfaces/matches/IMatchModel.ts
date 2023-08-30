import { ICRUDModelReader } from '../ICRUDModel';
import IMatch from './IMatch';

export interface IMatchModel extends ICRUDModelReader<IMatch> {
  findByFilterProgress(query: boolean): Promise<IMatch[]>
  finishMatch(id: number): Promise<void>
}
