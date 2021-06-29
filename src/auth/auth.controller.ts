import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateProviderDto } from '../providers/dto/create-provider.dto';
import { ProvidersService } from '../providers/providers.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private providersService: ProvidersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
}
