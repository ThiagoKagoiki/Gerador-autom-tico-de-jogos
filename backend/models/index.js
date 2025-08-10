import { Sequelize } from 'sequelize';
import 'dotenv/config';
import JogadoresModel from './Jogadores.js';


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  String(process.env.DB_PASS),
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    port: Number(process.env.DB_PORT) || 5432
  }
);

const db = {
  Sequelize,
  sequelize,
  Jogador: JogadoresModel(sequelize)
};

export default db;