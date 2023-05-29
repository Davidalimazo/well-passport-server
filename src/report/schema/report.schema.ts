import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @Prop({ required: true, unique: true })
  reportId: string;

  @Prop({ required: true })
  adminId: string;

  @Prop({ required: true })
  fieldId: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  wellId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  image: string;

}

export const ReportSchema = SchemaFactory.createForClass(Report);
