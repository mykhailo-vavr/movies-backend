import { Response } from '@/types';
import { statusCodes, tokensHelper } from '@/utils';
import { RefreshTokenRequest, SignInRequest, SignUpRequest, VerifyCodeRequest } from './requests';
import { AuthenticationService } from './service';

export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async signUp({ body }: SignUpRequest, res: Response) {
    await this.authenticationService.signUp(body);
    res.status(statusCodes.ok).json('User created successfully');
  }

  async signIn({ body }: SignInRequest, res: Response) {
    const tokenData = await this.authenticationService.signIn(body.email, body.password);
    res.status(statusCodes.ok).json(tokenData);
  }

  async verifyCode({ body, headers }: VerifyCodeRequest, res: Response) {
    const token = headers.authorization || '';
    const verificationToken = tokensHelper.verify.verification<{ user: { id: string } }>(token);

    await this.authenticationService.verifyCode(body.email, body.code);

    const accessToken = tokensHelper.generate.access({ user: { id: verificationToken.user.id } });
    const refreshToken = tokensHelper.generate.refresh({ user: { id: verificationToken.user.id } });

    res.status(statusCodes.ok).json({ accessToken, refreshToken });
  }

  async refreshToken({ query }: RefreshTokenRequest, res: Response) {
    const tokenData = await this.authenticationService.refreshToken(query.refreshToken);
    res.status(statusCodes.ok).json(tokenData);
  }
}
