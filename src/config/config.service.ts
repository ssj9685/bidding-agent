import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public async getMongoConfig() {
    const MONGO_USER = this.get('MONGO_USER');
    const MONGO_PASSWORD = this.get('MONGO_PASSWORD');
    const MONGO_HOST = this.get('MONGO_HOST');
    //const MONGO_DATABASE = this.get('MONGO_DATABASE');
    return {
      uri: `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`,
      useNewUrlParser: true,
    };
  }
}
