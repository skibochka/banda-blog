import { IStateManager } from '../../interfaces/IStateManager';
import { SimpleState } from '../tests/simpleState';

export class SimpleSM implements IStateManager {
  private state: SimpleState;

  async init() {
    this.state = new SimpleState();
  }

  async get(key: string) {
    return this.state.get(key);
  }

  async set(key: string, value: any, _expiryMode?: string, _time?: string | number): Promise<string | null> {
    this.state.set(key, value);
    return value;
  }
}
