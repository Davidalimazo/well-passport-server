import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contactPerson: string;

  @Prop({ required: true })
  mobile: string;

  @Prop()
  image: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  adminId: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop()
  website: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
