import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Address extends Document {
  @Prop({ required: true })
  city: string;

  @Prop()
  streetName: string;

  @Prop()
  streetNumber: string;

  @Prop()
  postalCode: number;

  @Prop({ required: true })
  country: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

export type ProviderDocument = Provider & Document;

@Schema()
export class Provider {
  @Prop({ required: true })
  name: string;

  @Prop({ type: AddressSchema })
  address: Address;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
