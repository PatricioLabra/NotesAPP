import { State } from './states';

export interface Note {
  title: string,
  description: string,
  state: State,
  id: number,
}
