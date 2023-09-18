import { Model } from '@/types';
import { CreationOptional } from 'sequelize';
import {
  Column,
  AllowNull,
  PrimaryKey,
  Unique,
  CreatedAt,
  UpdatedAt,
  DataType,
  Table,
  IsEmail,
  NotEmpty,
  Length,
} from 'sequelize-typescript';

@Table({ modelName: 'User', tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id!: CreationOptional<number>;

  @NotEmpty
  @Length({ min: 1, max: 50 })
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(50))
  name!: string;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
  email!: string;

  @NotEmpty
  @Length({ min: 1, max: 255 })
  @AllowNull(false)
  @Column(DataType.STRING(255))
  password!: string;

  @CreatedAt
  createdAt!: CreationOptional<Date>;

  @UpdatedAt
  updatedAt!: CreationOptional<Date>;
}
