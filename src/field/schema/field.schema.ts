import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FieldDocument = Field & Document;

export interface Superintendent {
  name: string;
  mobileNo: string;
  email: string;
}

@Schema({ timestamps: true })
export class Field {
  @Prop({ required: true, unique: true })
  fieldId: string;

  @Prop({ required: true })
  adminId: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  numberOfWells: number;

  @Prop()
  image: string;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;

  @Prop({ type: Object })
  superintendent: Superintendent;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
