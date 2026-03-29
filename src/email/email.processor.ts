import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { EMAIL_QUEUE } from './email.constants';
import { SendEmailPayload } from './email.service';

@Processor(EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
  private readonly resend: Resend;
  private readonly from: string;
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly config: ConfigService) {
    super();
    this.resend = new Resend(config.get('RESEND_API_KEY'));
    this.from = config.get('RESEND_FROM') ?? 'onboarding@resend.dev';
  }

  async process(job: Job<SendEmailPayload>) {
    const { to, subject, html } = job.data;

    const { error } = await this.resend.emails.send({
      from: this.from,
      to,
      subject,
      html,
    });

    if (error) {
      const isLastAttempt = job.attemptsMade + 1 >= (job.opts.attempts ?? 1);

      if (isLastAttempt) {
        this.logger.error(`Email fallido definitivamente a ${to} — "${subject}" — jobId=${job.id}`);
        await this.callWebhook(String(job.id), 'FAILED', error.message);
      } else {
        this.logger.warn(`Error al enviar email a ${to} (intento ${job.attemptsMade + 1}) — reintentando`);
      }

      throw new Error(error.message);
    }

    this.logger.log(`Email enviado a ${to} — "${subject}" — jobId=${job.id}`);
    await this.callWebhook(String(job.id), 'SENT');
  }

  private async callWebhook(jobId: string, status: 'SENT' | 'FAILED', error?: string) {
    const webhookUrl = this.config.get('BACKEND_WEBHOOK_URL');
    const webhookSecret = this.config.get('BACKEND_WEBHOOK_SECRET');

    if (!webhookUrl || !webhookSecret) return;

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': webhookSecret,
        },
        body: JSON.stringify({ jobId, status, error }),
      });
    } catch (e) {
      this.logger.error(`Error al llamar al webhook del backend para jobId=${jobId}`, e instanceof Error ? e.stack : String(e));
    }
  }
}
