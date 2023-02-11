import { Sequelize } from 'sequelize-typescript';
import { ConfigKeysEnum, getConfig } from '@/utils';
import { InternalServerError } from '@/common/error';
import { Message, User, VerifyCode } from './models';

const getSequelizeInstance = () => {
  const connectionString = getConfig(ConfigKeysEnum.DB_CONNECTION_URI);

  if (!connectionString) {
    throw new InternalServerError('Error occurred while connecting to DB');
  }

  return new Sequelize(connectionString, { logging: false });
};

const sequelize = getSequelizeInstance();

(async () => {
  await sequelize.authenticate();
  console.info('Connection to database has been established successfully.');

  sequelize.addModels([User, Message, VerifyCode]);
})().catch(console.error);

export default sequelize;
