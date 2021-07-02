import { Injectable } from '@nestjs/common';
import { ProductStatisticsService } from '../products/statistics/product-statistics.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly productStatService: ProductStatisticsService) {}

  async getAll(): Promise<any> {
    const offersCount: number = await this.productStatService.getProductCount();
    console.log('get offersCount', offersCount);

    return {
      offersCount,
    };
  }
}
