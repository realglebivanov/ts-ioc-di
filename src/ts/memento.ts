import { State } from './container';

export class Memento {
  public constructor(
    private state: State
  ) { }

  public setState(state: State): void {
    this.state = state;
  }

  public getState(): State {
    return this.state;
  }
}
