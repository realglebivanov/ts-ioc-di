import { Binding } from '@/bindings';
import { Class } from '@/class';

export type State = Map<Class<any>, Binding<any>>;

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
