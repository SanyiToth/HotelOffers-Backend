import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './entities/provider.entity';
import { ProvidersAccountSettingsController } from './providers-account-settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProvidersController, ProvidersAccountSettingsController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
