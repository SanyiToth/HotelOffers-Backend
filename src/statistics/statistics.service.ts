import { Injectable } from '@nestjs/common';
import { ProductStatisticsService } from '../products/statistics/product-statistics.service';
import { OrderStatisticsService } from '../orders/statistics/order-statistics.service';
import { ProviderStatisticsService } from '../providers/statistics/provider-statistics.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly productStatService: ProductStatisticsService,
    private readonly ordersStatService: OrderStatisticsService,
    private readonly providerStatsService: ProviderStatisticsService,
  ) {}

  async getAll(): Promise<any> {
    const offersCount: number = await this.productStatService.getProductCount();
    const ordersCount: number = await this.ordersStatService.getOrdersCount();
    const providersCount: number = await this.providerStatsService.getProvidersCount();

    return {
      offersCount,
      ordersCount,
      providersCount,
    };
  }
}
