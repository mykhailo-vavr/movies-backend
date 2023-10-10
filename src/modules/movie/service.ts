import {
  ExtensionsEnum,
  OrderEnum,
  generatePaginationCondition,
  getReadFileByLineIterator,
  likeOperator,
  readFormDataFile,
  removeDuplicates,
} from '@/utils';
import { BadRequestError, ConflictError, NotFoundError } from '@/common';
import { FileInfo, Headers, Request, ReadableStream } from '@/types';
import { Actor, FormatEnum, Movie, createTransaction, sequelize } from '@/database';
import { Op } from 'sequelize';
import { ActorService } from '../actor';
import { CreateRequest, DeleteRequest, GetAllRequest, GetByPkRequest, UpdateRequest } from './requests';

export class MovieService {
  constructor(private readonly movieModel: typeof Movie, private readonly actorService: ActorService) {}

  async create(data: CreateRequest['body']) {
    const { title, year, format, actors } = data;

    if (!actors?.length) {
      throw new BadRequestError('Actors field is empty');
    }

    const createdMovie = await createTransaction(async () => {
      const [movie, created] = await this.movieModel.findOrCreate({
        where: {
          title,
        },
        defaults: {
          title,
          year,
          format,
        },
      });

      if (!created) {
        throw new ConflictError('Movie with such title is already exists');
      }

      await Promise.all(
        removeDuplicates(actors).map(async (name) => {
          const actor = await this.actorService.create({ name });
          await movie.$add('actor', actor);
        }),
      );

      await movie.reload({ include: { model: Actor, through: { attributes: [] } } });

      return movie;
    });

    return createdMovie;
  }

  async delete(id: DeleteRequest['params']['id']) {
    const existedMovie = await this.getByPk(id);

    if (!existedMovie) {
      throw new NotFoundError('There is no movie with such id');
    }

    await this.movieModel.destroy({
      where: {
        id,
      },
    });
  }

  async update(id: UpdateRequest['params']['id'], data: UpdateRequest['body']) {
    const { title, year, format, actors } = data;

    const existedMovie = await this.getByPk(id);

    if (!existedMovie) {
      throw new NotFoundError('There is no movie with such id');
    }

    const updatedMovie = await createTransaction(async () => {
      const movie = await existedMovie.update({ title, year, format });

      if (!actors?.length) {
        return movie;
      }

      await Promise.all(
        removeDuplicates(actors).map(async (name) => {
          const actor = await this.actorService.create({ name });
          await movie.$add('actor', actor);
        }),
      );

      await movie.reload({ include: { model: Actor, through: { attributes: [] } } });

      return movie;
    });

    return updatedMovie;
  }

  async getByPk(id: GetByPkRequest['params']['id']) {
    const movie = await this.movieModel.findByPk(id, {
      include: [
        {
          model: Actor,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!movie) {
      throw new NotFoundError('There is no movie with such id');
    }

    return movie;
  }

  async getAll(query: GetAllRequest['query']) {
    const { actor, title, search, sort = 'id', order = OrderEnum.ASC, limit, offset } = query;

    const movies = await this.movieModel.findAndCountAll({
      distinct: true,
      where: {
        [Op.and]: [{ title: likeOperator(title) }, { '$actors.name$': likeOperator(actor) }],
        [Op.or]: [{ title: likeOperator(search) }, { '$actors.name$': likeOperator(search) }],
      },
      include: {
        model: Actor,
        attributes: [],
      },
      order: [[sequelize.fn('lower', sequelize.col(`${Movie.name}.${sort}`)), order]],

      ...generatePaginationCondition({ limit, offset }),
      subQuery: false,
    });

    return movies;
  }

  async import(headers: Headers, pipe: Request['pipe']) {
    const onFile = async (resolve: (value: Movie[]) => void, name: string, file: ReadableStream, info: FileInfo) => {
      if (info.extension !== ExtensionsEnum.TXT) {
        throw new BadRequestError('File type could only be .txt');
      }

      const rl = getReadFileByLineIterator(file);

      let movie: Partial<Parameters<typeof this.create>[0]> = {};
      const movies: Movie[] = [];

      for await (const line of rl) {
        if (!line.trim().length) {
          movie = {};
          continue;
        }

        const [field, value] = line.split(': ');
        const lowerCaseField = field.toLowerCase();

        if (!value) {
          continue;
        }

        switch (lowerCaseField) {
          case 'title':
            movie.title = value;
            break;
          case 'release year':
            if (!Number.isNaN(+value)) {
              movie.year = +value;
            }
            break;
          case 'format':
            if (Object.values<string>(FormatEnum).includes(value)) {
              movie.format = value as FormatEnum;
            }
            break;
          case 'stars':
            movie.actors = value.split(', ');
            break;
          default:
            break;
        }

        if (Object.values(movie).length === 4) {
          try {
            const createdMovie = await this.create(movie as Required<typeof movie>);
            movies.push(createdMovie);
          } catch {
            /* empty */
          } finally {
            movie = {};
          }
        }
      }

      resolve(movies);
    };

    const rows = await readFormDataFile<Movie[]>(headers, pipe, onFile);
    return { rows, count: rows.length };
  }
}
