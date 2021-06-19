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

  async findAll(): Promise<Provider[]> {
    return await this.providerModel.find().exec();
  }

  async findOne(id: string): Promise<Provider | undefined> {
    return await this.findProvider(id);
  }

  async findOneByUsername(username: string): Promise<Provider> {
    return await this.providerModel.findOne({ username: username }).exec();
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }

  private async findProvider(id: string) {
    let provider;

    try {
      provider = await this.providerModel.findById(id).exec();
    } catch (error) {
      console.log('error', error);
      throw new NotFoundException('Could not find provider!');
    }

    if (!provider) {
      throw new NotFoundException('Could not find provider!');
    }

    return provider;
  }
}
