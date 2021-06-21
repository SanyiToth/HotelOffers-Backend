import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export enum Status {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  CANCELLED = 'CANCELLED',
  FULFILLED = 'FULFILLED',
}

@Schema()
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ enum: ['NEW', 'ACCEPTED', 'CANCELLED', 'FULFILLED'] })
  status: Status;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Provider',
    required: true,
    default: Status.NEW,
  })
  provider: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop()
  note: string;

  @Prop({ type: CustomerSchema, required: true })
  customer: Customer;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
