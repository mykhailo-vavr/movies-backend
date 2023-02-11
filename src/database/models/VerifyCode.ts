import { Model } from '@/types';
import { CreationOptional } from 'sequelize';
import { Table, PrimaryKey, Column, DataType, AllowNull, CreatedAt } from 'sequelize-typescript';

@Table({ modelName: 'VerifyCode', tableName: 'verify_code' })
class VerifyCode extends Model<VerifyCode> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id!: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  code!: string;

  @CreatedAt
  createdAt!: CreationOptional<Date>;
}

export { VerifyCode };
