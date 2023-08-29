import { ICRUDModelReader } from '../ICRUDModel';
import IMatch from './IMatch';

export interface IMatchModel extends ICRUDModelReader<IMatch> {
  // findByQuery(q: string): Promise<IMatch[]>
  id?: number;
}
