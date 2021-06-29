import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export enum Status {
  Active = 'Active',
  Deactivated = 'Deactivated',
  Archived = 'Archived',
}

@Schema()
export class DateInterval {
  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const DateIntervalSchema = SchemaFactory.createForClass(DateInterval);

@Schema()
export class Rating {
  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  numberOfRatings: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ enum: ['Active', 'Deactivated', 'Archived'] })
  status: Status;

  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  details: string;

  @Prop({ type: DateIntervalSchema })
  dateInterval: DateInterval;

  @Prop()
  availableOffers: number;

  @Prop({ min: [0, 'Negative values are not supported'], default: 0 })
  price: number;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Provider' })
  provider: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  tags: string;

  @Prop({ type: RatingSchema })
  ratingInfo: Rating;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
