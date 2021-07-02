import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrderStatisticsService {
  constructor(
    @InjectModel(Order.name)
    private readonly model: Model<OrderDocument>,
  ) {}

  async getOrdersCount(): Promise<number> {
    return await this.model.find().countDocuments().exec();
  }
}
