import { sequelize } from './instance';

(async () => {
  await sequelize.authenticate();
  console.info('Connection to database has been established successfully.');
})().catch(console.error);

export { sequelize };
export * from './models';
export * from './namespace';
export * from './transaction';
