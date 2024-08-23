import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Project } from './entity/Project';
import { Task } from './entity/Task';
import { config } from './config/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  ssl: config.db.ssl,
  synchronize: true,
  logging: false,
  entities: [User, Project, Task],
  migrations: [],
  subscribers: [],
});
