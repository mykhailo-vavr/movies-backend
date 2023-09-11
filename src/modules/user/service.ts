import { Op } from 'sequelize';
import { User } from '@/database';
import { ConflictError, BadRequestError } from '@/common';
import { hash, tokensHelper } from '@/utils';
import { CreateRequest } from './requests';

export class UserService {
  constructor(private readonly userModel: typeof User) {}

  async getByEmail(email: string) {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async create(data: CreateRequest['body']) {
    const { email, name, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new BadRequestError('Passwords mismatch');
    }

    const hashedPassword = await hash(password);

    const [user, created] = await this.userModel.findOrCreate({
      where: { [Op.or]: [{ name }, { email }] },
      defaults: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!created) {
      throw new ConflictError('User with such email or name is already exists');
    }

    const accessToken = tokensHelper.generate.access({
      id: user.id,
      name: user.name,
      email: user.email,
      createAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return { accessToken };
  }
}
