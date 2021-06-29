import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider, ProviderDocument } from '../entities/provider.entity';

@Injectable()
export class ProviderLocationsService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<ProviderDocument>,
  ) {}

  async getLocations(): Promise<Provider[]> {
    const cities = await this.providerModel
      .find()
      .select('address.city')
      .distinct('address.city');
    return cities;
  }
}
