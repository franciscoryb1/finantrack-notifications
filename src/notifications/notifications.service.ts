import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly emailService: EmailService) {}

  async sendPasswordReset(to: string, resetUrl: string) {
    await this.emailService.sendEmail({
      to,
      subject: 'Recuperar contraseña — Finantrack',
      html: `
        <p>Hola,</p>
        <p>Recibimos una solicitud para recuperar tu contraseña.</p>
        <p>
          <a href="${resetUrl}" style="
            display:inline-block;
            padding:10px 20px;
            background:#1e3a8a;
            color:#fff;
            border-radius:6px;
            text-decoration:none;
            font-weight:bold;
          ">
            Recuperar contraseña
          </a>
        </p>
        <p>El enlace expira en 1 hora. Si no solicitaste esto, ignorá este email.</p>
      `,
    });
  }

  async sendWelcome(to: string, firstName: string) {
    await this.emailService.sendEmail({
      to,
      subject: '¡Bienvenido a Finantrack!',
      html: `
        <p>Hola ${firstName},</p>
        <p>Tu cuenta fue creada exitosamente. ¡Ya podés empezar a registrar tus finanzas!</p>
        <p>
          <a href="${process.env.APP_URL ?? 'http://localhost:3001'}" style="
            display:inline-block;
            padding:10px 20px;
            background:#059669;
            color:#fff;
            border-radius:6px;
            text-decoration:none;
            font-weight:bold;
          ">
            Ir a Finantrack
          </a>
        </p>
      `,
    });
  }
}
