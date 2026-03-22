import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { IsEmail, IsString, MinLength } from 'class-validator';

class SendPasswordResetDto {
  @IsEmail()
  to: string;

  @IsString()
  @MinLength(10)
  resetUrl: string;
}

class SendWelcomeDto {
  @IsEmail()
  to: string;

  @IsString()
  firstName: string;
}

class SendEmailVerificationDto {
  @IsEmail()
  to: string;

  @IsString()
  firstName: string;

  @IsString()
  @MinLength(10)
  verifyUrl: string;
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
    await this.notifications.sendPasswordReset(dto.to, dto.resetUrl);
    return { queued: true };
  }

  @Post('welcome')
  async welcome(
    @Headers() headers: Record<string, string>,
    @Body() dto: SendWelcomeDto,
  ) {
    this.verifyApiKey(headers);
    await this.notifications.sendWelcome(dto.to, dto.firstName);
    return { queued: true };
  }

  @Post('email-verification')
  async emailVerification(
    @Headers() headers: Record<string, string>,
    @Body() dto: SendEmailVerificationDto,
  ) {
    this.verifyApiKey(headers);
    await this.notifications.sendEmailVerification(dto.to, dto.firstName, dto.verifyUrl);
    return { queued: true };
  }
}
