import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RecycleDocument = Recycle & Document;

@Schema({ timestamps: true })
export class Recycle {
  @Prop({ required: true, unique: true })
  recycleId: string;

  @Prop({ required: true })
  adminId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

}

export const RecycleSchema = SchemaFactory.createForClass(Recycle);
