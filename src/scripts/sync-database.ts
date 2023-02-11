import sequelize from '@/database';
import '@/database/models';

const syncDatabase = async () => {
  await sequelize.authenticate();
  console.info('Connected successfully');

  await sequelize.sync({ force: true });
  console.info('Synced successfully');

  process.exit();
};

syncDatabase().catch(console.error);
