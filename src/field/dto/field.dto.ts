import { Field, Superintendent } from '../schema/field.schema';
import * as Joi from 'joi';

export interface UpdateFieldDto {
  name: string;

  numberOfWells: number;

  image: string;

  longitude: number;

  latitude: number;

  superintendent: Superintendent;
}

export interface IField extends Field {}

export type PartialField = Partial<Field>;

export interface IFieldCreateRequest {
  name: string;

  numberOfWells: number;

  image?: string;

  longitude: number;

  latitude: number;

  superintendent: Superintendent;

  clientId: string;
}

export const createFieldSchema = Joi.object({
  name: Joi.string().required(),

  numberOfWells: Joi.number().required(),

  image: Joi.string(),

  longitude: Joi.number().required(),

  latitude: Joi.number().required(),

  superintendent: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNo: Joi.string().required(),
  }).required(),

  clientId: Joi.string().required(),
});
