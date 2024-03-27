import { DataSource, DataSourceOptions } from 'typeorm';


if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else {
  require('dotenv').config({ path: '.env' });
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  // schema: 'auth',
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  synchronize: false, // process.env.TYPEORM_SYNCHRONIZE === 'true',
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
