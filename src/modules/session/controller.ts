import { Response } from '@/types';
import { StatusCodesEnum } from '@/utils';
import { SignInRequest } from './requests';
import { SessionService } from './service';

export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  async signIn({ body }: SignInRequest, res: Response) {
    const { accessToken } = await this.sessionService.signIn(body.email, body.password);
    res.status(StatusCodesEnum.OK).json({ token: accessToken });
  }
}
