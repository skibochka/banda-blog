import 'dotenv/config';

export = [{
  name: process.env.ORM_CONNECTION_NAME,
  type: process.env.ORM_TYPE,
  host: process.env.ORM_HOST,
  port: process.env.ORM_PORT,
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: [
    process.env.ORM_ENTITIES,
  ],
  migrations: [
    process.env.ORM_MIGRATIONS,
  ],
  cli: {
    entitiesDir: process.env.ORM_ENTITIES_DIR,
    migrationsDir: process.env.ORM_MIGRATIONS_DIR,
  },
},
{
  name: process.env.TEST_ORM_CONNECTION_NAME,
  type: process.env.TEST_ORM_TYPE,
  database: process.env.TEST_ORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    process.env.TEST_ORM_ENTITIES,
  ],
  migrations: [
    process.env.TEST_ORM_MIGRATIONS,
  ],
  cli: {
    entitiesDir: process.env.TEST_ORM_ENTITIES_DIR,
    migrationsDir: process.env.TEST_ORM_MIGRATIONS_DIR,
  },
}]
