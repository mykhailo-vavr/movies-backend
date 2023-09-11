import { sequelize } from '@/database';

const syncDatabase = async () => {
  await sequelize.sync({ force: true });
  console.info('Synced successfully');

  process.exit();
};

syncDatabase().catch(console.error);
