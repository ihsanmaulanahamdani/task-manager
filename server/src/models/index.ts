import sequelize from '../config/database';
import User from './User';
import Task from './Task';

export { User, Task };

export const initDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
