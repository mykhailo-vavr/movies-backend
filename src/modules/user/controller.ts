import { Response } from '@/types';
import { statusCodes } from '@/utils';
import { UserService } from './service';
import { GetAllRequest, GetByPkRequest } from './requests';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getByPk({ params }: GetByPkRequest, res: Response) {
    const user = await this.userService.getByPk(params.id);
    res.status(statusCodes.ok).json(user);
  }

  async getAll({ query }: GetAllRequest, res: Response) {
    const users = await this.userService.getAll(query);
    res.status(statusCodes.ok).json(users);
  }
}
