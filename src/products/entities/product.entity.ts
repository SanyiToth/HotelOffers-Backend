import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
  Ended = 'Ended',
  Deleted = 'Deleted',
  Draft = 'Draft',
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
export class Image {
  @Prop({ required: true })
  link: string;

  @Prop()
  height: number;

  @Prop()
  width: number;

  @Prop()
  type: string;

  @Prop()
  size: number;

  @Prop()
  deletehash: string;

  @Prop()
  imgId: string; //imgur id
}

export const ImageSchema = SchemaFactory.createForClass(Image);

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
  @Prop({
    enum: ['Active', 'Inactive', 'Ended', 'Deleted', 'Draft'],
    defult: Status.Draft,
  })
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

  @Prop({ type: [ImageSchema], default: [] })
  images: Image[];

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Provider',
  })
  provider: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: RatingSchema })
  ratingInfo: Rating;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
