import { Exclude } from 'class-transformer';
import { User } from '../schema/users.schema';
import * as Joi from 'joi';

export interface UpdateDto {
  firstName: string;
  lastName: string;

  password: string;

  image: string;
}

export const updateUserSchema = Joi.object({
  userId: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),

  password: Joi.string().required(),

  image: Joi.string().required(),
});

export enum Role {
  ADMIN,
  USER,
  CLIENT,
}

export interface IUsers extends User {}

export type PartialUsers = Partial<User>;

export interface changePasswordDto extends PartialUsers {
  oldPassword: string;

  newPassword: string;
}

export interface IAccount {
  firstName: string;

  lastName: string;

  image?: string;

  email: string;

  role?: string;
}
export interface ILogin {
  password: string;

  email: string;
}

export const createuserSchema = Joi.object({
  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  email: Joi.string().email().required(),

  role: Joi.string().valid('ADMIN', 'USER', 'CLIENT').required(),
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
}

export class SerializeUser {
  userId: string;

  firstName: string;

  lastName: string;

  image?: string;

  email: string;

  role?: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializeUser>) {
    Object.assign(this, partial);
  }
}
