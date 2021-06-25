import { Controller, Get } from '@nestjs/common';
import { ProviderLocationsService } from './provider-locations.service';

@Controller('locations')
export class ProvidersLocationsController {
  constructor(private readonly locaationsService: ProviderLocationsService) {}

  @Get()
  findAll() {
    return this.locaationsService.getLocations();
  }
}
