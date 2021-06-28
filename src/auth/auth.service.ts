import { Injectable } from '@nestjs/common';
import { ProvidersService } from '../providers/providers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private providerService: ProvidersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.providerService.findOneByUsername(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user['_doc']['_id'] };
    return {
      loggedInProvider: user['_doc'],
      access_token: this.jwtService.sign(payload),
    };
  }
}
