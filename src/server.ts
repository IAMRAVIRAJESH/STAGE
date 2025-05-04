import express from 'express';
import dotenv from 'dotenv';
import { sequelize, initializeModels, associateModels } from './config/database';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

const startServer = async () => {
  try {
    const models = initializeModels();
    associateModels(models);
    //await sequelize.sync({ alter: true });
    //await sequelize.sync({ force: true }); //for dropping all tables and data
    console.log('Database synchronized successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
