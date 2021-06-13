import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProviderDocument = Provider & Document;

@Schema()
export class Provider {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
