import { Injectable } from '@nestjs/common';
import { ProvidersService } from '../providers/providers.service';

@Injectable()
export class AuthService {
  constructor(private providerService: ProvidersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.providerService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
