import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

class SendPasswordResetDto {
  @IsEmail()
  to: string;

  @IsString()
  @MinLength(10)
  resetUrl: string;

  @IsOptional()
  @IsNumber()
  notificationId?: number;
}

class SendWelcomeDto {
  @IsEmail()
  to: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsNumber()
  notificationId?: number;
}

class SendEmailVerificationDto {
  @IsEmail()
  to: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsString()
  @MinLength(10)
  verifyUrl: string;

  @IsOptional()
  @IsNumber()
  notificationId?: number;
}

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notifications: NotificationsService,
    private readonly config: ConfigService,
  ) {}

  private verifyApiKey(headers: Record<string, string>) {
    const key = headers['x-api-key'];
    if (key !== this.config.get('INTERNAL_API_KEY')) {
      throw new UnauthorizedException('API key inválida');
    }
  }

  @Post('password-reset')
  async passwordReset(
    @Headers() headers: Record<string, string>,
    @Body() dto: SendPasswordResetDto,
  ) {
    this.verifyApiKey(headers);
    const jobId = await this.notifications.sendPasswordReset(dto.to, dto.resetUrl, dto.notificationId);
    return { queued: true, jobId };
  }

  @Post('welcome')
  async welcome(
    @Headers() headers: Record<string, string>,
    @Body() dto: SendWelcomeDto,
  ) {
    this.verifyApiKey(headers);
    const jobId = await this.notifications.sendWelcome(dto.to, dto.firstName, dto.notificationId);
    return { queued: true, jobId };
  }

  @Post('email-verification')
  async emailVerification(
    @Headers() headers: Record<string, string>,
    @Body() dto: SendEmailVerificationDto,
  ) {
    this.verifyApiKey(headers);
    const jobId = await this.notifications.sendEmailVerification(dto.to, dto.firstName, dto.verifyUrl, dto.notificationId);
    return { queued: true, jobId };
  }
}
