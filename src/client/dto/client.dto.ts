import { Client } from '../schema/client.schema';
import * as Joi from 'joi';

export interface UpdateClientDto {
  name: string;

  contactPerson: string;

  mobile: string;

  image?: string;

  website: string;

  address?: string;
}

export interface IClient extends Client {}

export type PartialClient = Partial<Client>;

export interface IClientCreateRequest {
  name: string;

  contactPerson: string;

  mobile: string;

  image?: string;

  email: string;

  address: string;

  ownerId: string;

  website: string;
}

export const createClientSchema = Joi.object({
  name: Joi.string().required(),

  contactPerson: Joi.string().required(),

  mobile: Joi.string().required(),

  image: Joi.string(),

  email: Joi.string().email().required(),

  address: Joi.string().required(),

  ownerId: Joi.string().required(),

  website: Joi.string().required(),
});
