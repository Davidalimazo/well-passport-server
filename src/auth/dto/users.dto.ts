import { Exclude } from 'class-transformer';
import { User } from '../schema/users.schema';
import * as Joi from 'joi';

export interface UpdateDto {
  firstName: string;
  lastName: string;

  password: string;

  image: string;
}

export enum Role {
  ADMIN,
  USER,
  CLIENT,
}

export interface IUsers extends User {}

export type PartialUsers = Partial<User>;

export interface IAccount {
  firstName: string;

  lastName: string;

  password?: string;

  image?: string;

  email: string;

  role?: string;

  createdorId: string;
}
export interface ILogin {
  password: string;

  email: string;
}

export const createuserSchema = Joi.object({
  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  password: Joi.string(),

  image: Joi.string().required(),

  email: Joi.string().email().required(),

  role: Joi.string().valid('ADMIN', 'USER', 'CLIENT').required(),

  createdorId: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
// export const paramIdSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

export interface IResponse {
  firstName: string;

  lastName: string;

  image?: string;

  email: string;

  role?: string;

  createdorId: string;
}

export class SerializeUser {
  userId: string;

  firstName: string;

  lastName: string;

  image?: string;

  email: string;

  role?: string;

  createdorId: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializeUser>) {
    Object.assign(this, partial);
  }
}
