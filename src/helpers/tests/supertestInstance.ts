import { appPromise } from '../../app';
import request from 'supertest';

let requestInstance: request.SuperTest<request.Test> | null = null;

export default async function supertestInstance() {
  if (!requestInstance) {
    const app = await appPromise();
    requestInstance = request(app);
  }
  return requestInstance;
}
