import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WellDocument = Well & Document;

export enum Status {
  DRIED,
  DRILLING,
  EXPLORING,
}

@Schema({ timestamps: true })
export class Well {
  @Prop({ required: true, unique: true })
  wellId: string;

  @Prop({ required: true })
  adminId: string;

  @Prop({ required: true })
  fieldId: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  wellType: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  treeSpecs: number;

  @Prop()
  image: string;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true, enum: Status, default: Status.EXPLORING })
  status: string;

  @Prop({ required: true })
  spudDate: Date;

  @Prop({ required: true })
  firstProductionDate: Date;

  @Prop({ required: true })
  initialCompletionDate: Date;

  @Prop({ required: true })
  bitSize: number;

  @Prop({ required: true })
  casting: number;

  @Prop({ required: true })
  totalDepth: number;

  @Prop({ required: true })
  turbingSize: number;

  @Prop({ required: true })
  flowStation: string;
}

export const WellSchema = SchemaFactory.createForClass(Well);
