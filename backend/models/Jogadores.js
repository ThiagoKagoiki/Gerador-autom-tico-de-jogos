import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Jogadores = sequelize.define('Jogadores', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      unique: true
    },
    pontos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  });

  return Jogadores;
};