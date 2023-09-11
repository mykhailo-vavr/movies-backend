import { Sequelize } from 'sequelize-typescript';
import { ConfigKeysEnum, getConfig } from '@/utils';
import models from './models';
import { namespace } from './namespace';

const getSequelizeInstance = () => {
  Sequelize.useCLS(namespace);

  return new Sequelize({
    dialect: getConfig(ConfigKeysEnum.DIALECT),
    storage: getConfig(ConfigKeysEnum.STORAGE),
    logging: false,
    models: Object.values(models),
  });
};

export const sequelize = getSequelizeInstance();
