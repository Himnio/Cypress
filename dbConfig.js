const pgp = require('pg-promise');

const dbConfig = {
  dbHost: 'psql.dev.docquity.com',
  dbLogin: 'hirak',
  dbPassword: 'hirak@32478',
  dbName: 'maximon_th',
  dbPort: 5432,
};

const connectionString = `postgres://${dbConfig.dbLogin}:${dbConfig.dbPassword}@${dbConfig.dbHost}:${dbConfig.dbPort}/${dbConfig.dbName}`;
const db = pgp()(connectionString);

module.exports = { db };
