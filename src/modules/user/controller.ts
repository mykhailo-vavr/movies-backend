import { Response } from '@/types';
import { StatusCodesEnum } from '@/utils';
import { UserService } from './service';
import { CreateRequest } from './requests';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create({ body }: CreateRequest, res: Response) {
    const { accessToken } = await this.userService.create(body);
    res.status(StatusCodesEnum.OK).json({ token: accessToken });
  }
}
