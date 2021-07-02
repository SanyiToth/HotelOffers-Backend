import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument, Status } from './entities/product.entity';
import { ProvidersService } from '../providers/providers.service';
import { Provider } from '../providers/entities/provider.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly providersService: ProvidersService,
  ) {}

  create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(query): Promise<Product[]> {
    if (query.hasOwnProperty('city')) {
      return await this.extracted(query);
    }

    return await this.productModel.find(query).populate('provider');
  }

  private async extracted(query): Promise<Product[]> {
    const providersOfCity: Provider[] = await this.providersService.findAll({
      'address.city': query.city,
    });

    const queries = [];
    providersOfCity.forEach((provider) => {
      //console.log("_p id", provider['_id']);
      queries.push(this.findPopulated(provider['_id']));
    });

    return Promise.all(queries).then((results) => {
      return results.reduce((acc, curr) => {
        return [...acc, ...curr];
      });
    });
  }

  async findByProviderId(id: string, status: Status): Promise<Product[]> {
    if (status) {
      return await this.productModel.find({ provider: id, status }).exec();
    }
    return await this.productModel.find({ provider: id }).exec();
  }

  async findOne(id: string): Promise<Product | undefined> {
    return await this.findProduct(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findProduct(id);

    for (const property in updateProductDto) {
      product[property] = updateProductDto[property];
    }

    return await product.save();
  }

  private async findPopulated(providerId: string): Promise<Product[]> {
    return await this.productModel
      .find({ provider: providerId })
      .populate('provider')
      .exec();
  }

  async remove(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Todo not found');
    } else return { deleteCount: result.deletedCount };
  }

  private async findProduct(id: string, populated = true) {
    let product;

    try {
      if (populated) {
        product = await this.productModel
          .findById(id)
          .populate('provider')
          .exec();
      } else {
        product = await this.productModel.findById(id).exec();
      }
    } catch (error) {
      console.log('error', error);
      throw new NotFoundException('Could not find product!');
    }

    if (!product) {
      throw new NotFoundException('Could not find product!');
    }

    return product;
  }
}
