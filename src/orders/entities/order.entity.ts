import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export enum Status {
  Active = 'Active',
  Cancelled = 'Cancelled',
  Pending = 'Pending',
}

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ enum: ['Active', 'Cancelled', 'Pending'] })
  status: Status;

  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  details: string;

  @Prop({ min: [0, 'Negative values are not supported'], default: 0 })
  price: number;

  @Prop({ type: [String] })
  images: string[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  })
  provider: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop()
  comments: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
