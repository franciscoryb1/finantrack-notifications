import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { EMAIL_QUEUE } from './email.constants';
import { SendEmailPayload } from './email.service';

@Processor(EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
  private readonly resend: Resend;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    super();
    this.resend = new Resend(config.get('RESEND_API_KEY'));
    this.from = config.get('RESEND_FROM') ?? 'onboarding@resend.dev';
  }

  async process(job: Job<SendEmailPayload>) {
    const { to, subject, html } = job.data;

    console.log(`[EmailProcessor] Enviando email a ${to} — "${subject}"`);

    const { error } = await this.resend.emails.send({
      from: this.from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error(`[EmailProcessor] Error al enviar:`, error);
      throw new Error(error.message);
    }

    console.log(`[EmailProcessor] Email enviado correctamente a ${to}`);
  }
}
