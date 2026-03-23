import { Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import { EmailService } from '../email/email.service';
import { WelcomeEmail } from '../email/templates/WelcomeEmail';
import { PasswordResetEmail } from '../email/templates/PasswordResetEmail';
import { EmailVerificationEmail } from '../email/templates/EmailVerificationEmail';

@Injectable()
export class NotificationsService {
  constructor(private readonly emailService: EmailService) {}

  async sendPasswordReset(to: string, resetUrl: string) {
    const html = await render(PasswordResetEmail({ resetUrl }));

    await this.emailService.sendEmail({
      to,
      subject: 'Recuperá tu contraseña de Finantrack',
      html,
    });
  }

  async sendWelcome(to: string, firstName: string) {
    const appUrl = process.env.APP_URL ?? 'http://localhost:3001';
    const html = await render(WelcomeEmail({ firstName, appUrl }));

    await this.emailService.sendEmail({
      to,
      subject: `¡Bienvenido a Finantrack, ${firstName}!`,
      html,
    });
  }

  async sendEmailVerification(to: string, firstName: string | null | undefined, verifyUrl: string) {
    const html = await render(EmailVerificationEmail({ firstName: firstName ?? '', verifyUrl }));

    await this.emailService.sendEmail({
      to,
      subject: 'Verificá tu email de Finantrack',
      html,
    });
  }
}
