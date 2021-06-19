import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProvidersModule } from '../providers/providers.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [ProvidersModule],
  exports: [AuthService],
})
export class AuthModule {}
