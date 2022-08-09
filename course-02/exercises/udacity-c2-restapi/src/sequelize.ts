import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


// console.log(config);
// const c = config.dev;

// // Instantiate new Sequelize instance!
// export const sequelize = new Sequelize({
//   "username": c.username,
//   "password": c.password,
//   "database": c.database,
//   "host":     c.host,

//   dialect: 'postgres',
//   storage: ':memory:',
// });



// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,

  dialect: "postgres",
  storage: ":memory:",
});
