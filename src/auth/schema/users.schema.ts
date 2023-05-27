import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsersDocument = User & Document;

enum Role {
  USER,
  CLIENT,
  ADMIN,
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  password: string;

  @Prop()
  image: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: Role, default: Role.CLIENT, required: true })
  role: string;

  @Prop()
  createdorId: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
