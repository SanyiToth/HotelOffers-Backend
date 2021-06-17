import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";



@Schema()
export class RatingInfo extends Document {
  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  numberOfRating: number;
}

export const RatingSchema = SchemaFactory.createForClass(RatingInfo);

export type ProductDocument = Product & Document;

@Schema()
export class Product {

  @Prop()
  status: string;

  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  details: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
  
  @Prop()
  availableOffers?: number;

  @Prop()
  price: number;

  @Prop()
  images: string;

  @Prop()
  providerId: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Provider' })
  provider: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  tags: string;

  @Prop({ type: RatingSchema })
  ratingInfo: RatingInfo;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
