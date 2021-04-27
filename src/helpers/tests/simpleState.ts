import { IState } from '../../interfaces/IState';

export class SimpleState {
  private readonly state: IState;

  constructor() {
    this.state = {};
  }

  public set(key: string, value: any): void {
    this.state[key] = JSON.stringify(value);
  }

  public get(key: string): string | null {
    return this.state[`${key}`];
  }
}
