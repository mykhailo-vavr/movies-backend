import nodemailer from 'nodemailer';
import { EmailOptions } from '@/types';
import { ConfigKeysEnum, getConfig } from './config';

export const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: getConfig(ConfigKeysEnum.EMAIL_SERVICE),
    auth: {
      user: getConfig(ConfigKeysEnum.EMAIL_USER),
      pass: getConfig(ConfigKeysEnum.EMAIL_PASS),
    },
  });

  await transporter.sendMail({
    from: 'no-reply',
    ...options,
  });
};
