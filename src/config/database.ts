import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { readdirSync } from 'fs';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME ?? '',
  process.env.DB_USER ?? '',
  process.env.DB_PASSWORD ?? '',
  {
    host: process.env.DB_HOST ?? '',
    dialect: 'postgres',
    logging: false,
  }
);

const initializeModels = () => {
  const modelsPath = path.join(__dirname, '../models');
  const modelFiles = readdirSync(modelsPath).filter(
    (file) => file.endsWith('.ts') || file.endsWith('.js')
  );

  const models: { [key: string]: any } = {};

  modelFiles.forEach((file) => {
    const modelPath = path.join(modelsPath, file);
    const model = require(modelPath).default ?? require(modelPath);

    if (typeof model.initialize === 'function') {
      models[model.name] = model.initialize(sequelize);
    }
  });

  return models;
};

const associateModels = (models: { [key: string]: any }) => {
  for (const modelName in models) {
    if (typeof models[modelName].associate === 'function') {
      models[modelName].associate(models);
    }
  }
};

export { sequelize, initializeModels, associateModels };
