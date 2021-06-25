import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(query): Promise<Product[]> {
    return await this.productModel.find(query).exec();
  }

  async findByProviderId(id: string): Promise<Product[]> {
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
