import { Model } from '@/types';
import { CreationOptional } from 'sequelize';
import {
  Column,
  AllowNull,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  Table,
  BelongsToMany,
  IsInt,
  Min,
  Max,
  IsIn,
  Length,
  Unique,
  NotEmpty,
} from 'sequelize-typescript';
import { Actor } from './Actor';

export enum FormatEnum {
  VHS = 'VHS',
  DVD = 'DVD',
  BluRay = 'Blu-Ray',
}

@Table({ modelName: 'Movie', tableName: 'movies' })
export class Movie extends Model<Movie> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id!: CreationOptional<number>;

  @NotEmpty
  @Length({ min: 1, max: 100 })
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
  title!: string;

  @Min(1800)
  @Max(new Date().getFullYear() + 10)
  @IsInt
  @AllowNull(false)
  @Column(DataType.SMALLINT)
  year!: number;

  @IsIn([Object.values(FormatEnum)])
  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(FormatEnum)))
  format!: FormatEnum;

  @BelongsToMany(() => Actor, 'actor_movie', 'movieId', 'actorId')
  actors!: CreationOptional<Actor[]>;

  @CreatedAt
  createdAt!: CreationOptional<Date>;

  @UpdatedAt
  updatedAt!: CreationOptional<Date>;
}
