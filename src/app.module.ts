import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { EmailModule } from './email/email.module';
import { NotificationsModule } from './notifications/notifications.module';
import { HealthModule } from './health/health.module';
import { EMAIL_QUEUE } from './email/email.constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD') || undefined,
        },
      }),
    }),

    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),

    BullBoardModule.forFeature({
      name: EMAIL_QUEUE,
      adapter: BullMQAdapter,
    }),

    EmailModule,
    NotificationsModule,
    HealthModule,
  ],
})
export class AppModule {}
