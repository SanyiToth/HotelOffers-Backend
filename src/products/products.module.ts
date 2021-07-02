import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProvidersModule } from '../providers/providers.module';
import { ProductStatisticsService } from './statistics/product-statistics.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ProvidersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductStatisticsService],
  exports: [ProductsService, ProductStatisticsService],
})
export class ProductsModule {}
