import { VerifyCode } from '@/database/models';
import { generateCode, hash, sendEmail, validateHash, tokensHelper } from '@/utils';
import { ConflictError, InternalServerError, UnauthorizedError } from '@/common/error';
import { SignInResponse } from './responses';
import { UserService } from '../user';
import { SignUpRequest } from './requests';
import { RefreshTokenResponse } from './responses/refresh-token.response';

export class AuthenticationService {
  constructor(private readonly verifyCodeModel: typeof VerifyCode, private readonly userService: UserService) {}

  async signUp(userData: SignUpRequest['body']): Promise<void> {
    const { firstName, lastName, password, email, phone } = userData;

    try {
      const existedUser = await this.userService.getByEmailOrPhone({ email, phone });

      if (existedUser) {
        throw new ConflictError('User with such email or phone is already exists');
      }

      const hashedPassword = await hash(password);

      await this.userService.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
      });
    } catch {
      throw new InternalServerError('Error while signing up user');
    }
  }

  async signIn(email: string, password: string): Promise<SignInResponse> {
    try {
      const user = await this.userService.getByEmailOrPhone({ email });

      if (!user) {
        throw new UnauthorizedError('Password or email are incorrect');
      }

      const validPassword = await validateHash(password, user.password);

      if (!validPassword) {
        throw new UnauthorizedError('Password or email are incorrect');
      }

      const code = generateCode();
      const hashedCode = await hash(code);

      await this.verifyCodeModel.destroy({
        where: { email },
      });

      await this.verifyCodeModel.create({
        email,
        code: hashedCode,
      });

      await sendEmail({ to: email, html: `<h2>${code}</h2>`, subject: 'Verification code' });

      const verificationToken = tokensHelper.generate.verification({ user: { email, id: user.id } });

      return { verificationToken };
    } catch (e) {
      throw new InternalServerError('Error while sign in user');
    }
  }

  async verifyCode(email: string, code: string): Promise<void> {
    try {
      const verifyCodeInfo = await this.verifyCodeModel.findOne({ where: { email } });

      if (!verifyCodeInfo) {
        throw new UnauthorizedError('Code or email are incorrect');
      }

      const validCode = await validateHash(code, verifyCodeInfo.code);

      if (!validCode) {
        throw new UnauthorizedError('Code or email are incorrect');
      }

      await this.verifyCodeModel.destroy({
        where: { email },
      });
    } catch (e) {
      throw new InternalServerError('Error while verifying code');
    }
  }

  async refreshToken(token: string): Promise<RefreshTokenResponse> {
    try {
      const tokenInfo = tokensHelper.verify.refresh<{
        user: { id: string };
      }>(token);

      const accessToken = tokensHelper.generate.access({ user: { id: tokenInfo.user.id } });

      return { accessToken };
    } catch {
      throw new InternalServerError('Error while refreshing token');
    }
  }
}
