import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Provider, ProviderDocument } from '../entities/provider.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProviderStatisticsService {
  constructor(
    @InjectModel(Provider.name)
    private readonly model: Model<ProviderDocument>,
  ) {}

  async getProvidersCount(): Promise<number> {
    return await this.model.find().countDocuments().exec();
  }
}
