import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider, ProviderDocument } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<ProviderDocument>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    const createdProvider = new this.providerModel(createProviderDto);
    return createdProvider.save();
  }

  async findAll(query): Promise<Provider[]> {
    return await this.providerModel.find(query).exec();
  }

  async findOne(
    id: string,
    exposeUsername = false,
  ): Promise<Provider | undefined> {
    return await this.findProvider(id, exposeUsername);
  }

  async findOneByUsername(username: string): Promise<Provider> {
    return await this.providerModel
      .findOne({ username: username })
      .select(['+username', '+password'])
      .exec();
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    return this.providerModel.findByIdAndUpdate(id, updateProviderDto);
  }

  remove(id: string) {
    return this.providerModel.findByIdAndDelete(id);
  }

  private async findProvider(id: string, exposeUsername = false) {
    let provider;

    try {
      if (exposeUsername) {
        provider = await this.providerModel
          .findById(id)
          .select(['+username'])
          .exec();
      } else {
        provider = await this.providerModel.findById(id);
      }
    } catch (error) {
      throw new NotFoundException('Could not find provider!');
    }

    if (!provider) {
      throw new NotFoundException('Could not find provider!');
    }

    return provider;
  }
}
