import { Model as SequelizeModel } from 'sequelize-typescript';
import { Attributes, CreationAttributes, InferAttributes, InferCreationAttributes } from 'sequelize';

export abstract class Model<M extends SequelizeModel> extends SequelizeModel<
  InferAttributes<M>,
  InferCreationAttributes<M>
> {}

export type ModelAttributes<M extends Model<M>> = Omit<Attributes<M>, 'deletedAt' | 'version'>;

export type PickModelAttributes<M extends Model<M>, P extends keyof ModelAttributes<M>> = Pick<ModelAttributes<M>, P>;

export type OmitModelAttributes<M extends Model<M>, P extends keyof ModelAttributes<M>> = Omit<ModelAttributes<M>, P>;

export type ModelCreationAttributes<M extends Model<M>> = Omit<CreationAttributes<M>, 'deletedAt' | 'version'>;

export type PickModelCreationAttributes<M extends Model<M>, P extends keyof ModelCreationAttributes<M>> = Pick<
  ModelCreationAttributes<M>,
  P
>;

export type OmitModelCreationAttributes<M extends Model<M>, P extends keyof ModelCreationAttributes<M>> = Omit<
  ModelCreationAttributes<M>,
  P
>;
