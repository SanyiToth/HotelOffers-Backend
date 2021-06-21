import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly model: Model<OrderDocument>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const created = new this.model(createOrderDto);
    return created.save();
  }

  async findAll(): Promise<Order[]> {
    return await this.model.find().exec();
  }

  findOne(id: string): Promise<Order> {
    return this.findOrder(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private async findOrder(id: string, populated = false) {
    let order;

    try {
      if (populated) {
        order = await this.model
          .findById(id)
          .populate('provider')
          .populate('product')
          .exec();
      } else {
        order = await this.model.findById(id).exec();
      }
    } catch (error) {
      console.log('error', error);
      throw new NotFoundException('Could not find order!');
    }

    if (!order) {
      throw new NotFoundException('Order does not exist!');
    }

    return order;
  }
}
