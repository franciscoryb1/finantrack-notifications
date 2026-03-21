import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EMAIL_QUEUE } from './email.constants';

export type EmailJobName = 'send-email';

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue) {}

  async sendEmail(payload: SendEmailPayload, opts?: { delay?: number }) {
    await this.emailQueue.add('send-email', payload, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 3000 },
      delay: opts?.delay,
    });
  }
}
