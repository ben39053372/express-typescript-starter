import redis from 'ioredis'
import { Service } from 'typedi'
import config from '../../config'

@Service()
export default class CacheService extends redis {
  constructor() {
    super(config.redis.port, config.redis.host)
  }

  async getStatus(): Promise<string | boolean> {
    await this.set('status', 'true')
    return (await this.get('status') === 'true') ?? false;
  }
} 