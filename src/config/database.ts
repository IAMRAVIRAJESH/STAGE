import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { readdirSync } from 'fs';
dotenv.config();

const dbUrl = 'postgresql://root:fewERntE84TvTnrWM7nW3m56bzeGhfA9@dpg-d0b5hb1r0fns73d5i0r0-a.oregon-postgres.render.com/stage_32d7';

// Create Sequelize instance with connection URL
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
  dialectOptions: {
    ssl: {
      require: true, // Most hosted PostgreSQL DBs require SSL
      rejectUnauthorized: false // Use this if you're getting certificate errors
    }
  }
});

const initializeModels = () => {
  const modelsPath = path.join(__dirname, '../models');
  const modelFiles = readdirSync(modelsPath).filter(
    (file) => file.endsWith('.ts') || file.endsWith('.js')
  );

  const models: { [key: string]: any } = {};

  modelFiles.forEach((file) => {
    const modelPath = path.join(modelsPath, file);
    const model = require(modelPath).default || require(modelPath);

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
