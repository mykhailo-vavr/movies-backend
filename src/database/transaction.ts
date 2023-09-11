import { Transaction } from 'sequelize';
import { sequelize } from './instance';

export const createTransaction = async <T>(f: (t: Transaction) => Promise<T>) => sequelize.transaction(f);
