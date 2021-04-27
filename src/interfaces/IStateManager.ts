export interface IStateManager {
  get(key: string): Promise<string | null | undefined>;

  set(key: string, value: any, expiryMode?: string, time?: string | number): Promise<string | null>;

  init(): Promise<void>;
}
