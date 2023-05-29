import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true })
  projectId: string;

  @Prop({ required: true })
  adminId: string;

  @Prop({ required: true })
  wellId: string;

  @Prop({ required: true })
  fieldId: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  rig: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
