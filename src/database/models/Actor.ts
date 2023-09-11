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
  Unique,
  Length,
} from 'sequelize-typescript';
import { Movie } from './Movie';

@Table({ modelName: 'Actor', tableName: 'actors' })
export class Actor extends Model<Actor> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id!: CreationOptional<number>;

  @Length({ min: 1, max: 50 })
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(50))
  name!: string;

  @BelongsToMany(() => Movie, 'actor_movie', 'actorId', 'movieId')
  movies!: CreationOptional<Movie[]>;

  @CreatedAt
  createdAt!: CreationOptional<Date>;

  @UpdatedAt
  updatedAt!: CreationOptional<Date>;
}
