import { IStateManager } from '../../interfaces/IStateManager';
import { SimpleSM } from '../stateManager/simpleSM';
import { RedisSM } from '../stateManager/redisSM';

class CacheStorage {
  constructor(private stateManager: IStateManager) {}

  static async init() {
    let sm: IStateManager;
    if (process.env.CURRENT_CONNECTION_NAME === 'test') {
      sm = new SimpleSM();
    } else {
      sm = new RedisSM();
    }

    await sm.init();

    return new this(sm);
  }

  async set(key: string, value: any, expiryMode?: string, time?: string | number) {
    return this.stateManager.set(key, value, expiryMode, time);
  }

  async get(key: string) {
    return this.stateManager.get(key);
  }
}

export default CacheStorage.init();
