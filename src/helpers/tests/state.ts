import { IState } from '../../interfaces/IState';

class State {
  private readonly state: IState;

  constructor() {
    this.state = {};
  }

  public set(key: string, value: any): void {
    this.state[`${key}`] = JSON.stringify(value);
  }

  public get(key: string): string | undefined {
    return this.state[`${key}`];
  }
}
export default new State();
