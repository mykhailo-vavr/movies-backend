import { validateHash, tokensHelper } from '@/utils';
import { UnauthorizedError } from '@/common';
import { UserService } from '../user';

export class SessionService {
  constructor(private readonly userService: UserService) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Password or email are incorrect');
    }

    const validPassword = await validateHash(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedError('Password or email are incorrect');
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
