import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";

export enum Status {
  Active = "Active",
  Deactivated = "Deactivated",
  Archived = "Archived",
}


export class DateInterval  {
  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type:Date })
  endDate:Date;
}

export const DateIntervalSchema = SchemaFactory.createForClass(DateInterval);

@Schema()
export class RatingInfo extends Document {
  @Prop({ required: true, default: 0 })
  rating: number;

  @Prop({ required: true, default: 0 })
  numberOfRatings: number;
}

export const RatingSchema = SchemaFactory.createForClass(RatingInfo);

export type ProductDocument = Product & Document;

@Schema()
export class Product {

  @Prop({ enum: ["Active", "Deactivated", "Archived"] })
  status: Status;


  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  details: string;

  @Prop({ type: DateIntervalSchema })
  dateInterval: DateInterval;

  @Prop()
  availableOffers: number;

  @Prop()
  price: number;

  @Prop({ type: [String] })
  images: string[];

  @Prop()
  providerId: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Provider" })
  provider: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  tags: string;

  @Prop({ type: RatingSchema })
  ratingInfo: RatingInfo;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
