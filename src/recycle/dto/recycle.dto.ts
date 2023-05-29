import { Recycle } from '../schema/recycle.schema';
import * as Joi from 'joi';

export interface UpdateRecycleDto {
  name: string;

  author: string;

  image: string;
}

export interface IRecycle extends Recycle {}

export type PartialRecycle = Partial<Recycle>;

export interface IRecycleCreateRequest {
  name: string;

  image?: string;
}

export const createRecycleSchema = Joi.object({
  name: Joi.string().required(),

  image: Joi.string(),
});
