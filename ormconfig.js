"use strict";
require("dotenv/config");
module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
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
        migrationsDir: process.env.ORM_MIGRATIONS_DIR
    }
};
