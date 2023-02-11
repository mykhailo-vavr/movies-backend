import { User } from '@/database/models';
import { Op } from 'sequelize';
import { ModelCreationAttributes } from '@/types';
import { InternalServerError, NotFoundError } from '../../common/error';
import { GetAllRequest } from './requests';
import { GetAllResponse, GetByPkResponse } from './responses';

export class UserService {
  constructor(private readonly userModel: typeof User) {}

  async getByPk(id: number): Promise<GetByPkResponse> {
    try {
      const user = await this.userModel.findOne({ where: { id }, attributes: { exclude: ['password'] } });

      if (!user) {
        throw new NotFoundError('There is no user with such id');
      }

      return user;
    } catch {
      throw new InternalServerError('Error while getting user');
    }
  }

  getByEmailOrPhone({ email, phone }: { email?: string; phone?: string }) {
    return this.userModel.findOne({
      where: { [Op.or]: [...(email ? [{ email }] : []), ...(phone ? [{ phone }] : [])] },
    });
  }

  async getAll(params: GetAllRequest['query']): Promise<GetAllResponse> {
    try {
      const { firstName, lastName, id } = params;

      const users = await this.userModel.findAll({
        where: {
          ...(firstName && { firstName: { [Op.iLike]: `%${firstName}%` } }),
          ...(lastName && { lastName: { [Op.iLike]: `%${lastName}%` } }),
          ...(id && { id: { [Op.ne]: id } }),
        },
        attributes: { exclude: ['password'] },
      });

      return users;
    } catch {
      throw new InternalServerError('Error while getting users');
    }
  }

  async create(userData: ModelCreationAttributes<User>) {
    await this.userModel.create(userData);
  }
}
