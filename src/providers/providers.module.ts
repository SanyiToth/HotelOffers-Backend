import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './entities/provider.entity';
import { ProvidersAccountSettingsController } from './account-settings/providers-account-settings.controller';
import { ProvidersLocationsController } from './locations/providers-locations.controller';
import { ProviderLocationsService } from './locations/provider-locations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [
    ProvidersController,
    ProvidersAccountSettingsController,
    ProvidersLocationsController,
  ],
  providers: [ProvidersService, ProviderLocationsService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
