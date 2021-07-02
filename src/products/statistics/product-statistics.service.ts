import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductStatisticsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getProductCount(): Promise<number> {
    return await this.productModel.find().countDocuments().exec();
  }
}
