import { Well } from '../schema/well.schema';
import * as Joi from 'joi';

export interface UpdateWellDto {
  name: string;

  numberOfWells: number;

  image: string;

  longitude: number;

  latitude: number;
}

export interface IWell extends Well {}

export type PartialWell = Partial<Well>;

export interface IWellCreateRequest {
  name: string;

  image?: string;

  longitude: number;

  latitude: number;

  fieldId: string;

  wellType: string;

  clientId: string;

  treeSpecs: number;

  status: string;

  spudDate: Date;

  firstProductionDate: Date;

  initialCompletionDate: Date;

  bitSize: number;

  casting: number;

  totalDepth: number;

  turbingSize: number;

  flowStation: string;
}

export const createWellSchema = Joi.object({
  name: Joi.string().required(),

  image: Joi.string(),

  longitude: Joi.number().required(),

  latitude: Joi.number().required(),

  wellType: Joi.string().required(),

  adminId: Joi.string().required(),

  clientId: Joi.string().required(),

  fieldId: Joi.string().required(),

  treeSpecs: Joi.number().required(),

  status: Joi.string().valid('DRIED', 'DRILLING', 'EXPLORING').required(),

  spudDate: Joi.date().required(),

  firstProductionDate: Joi.date().required(),

  initialCompletionDate: Joi.date().required(),

  bitSize: Joi.number().required(),

  casting: Joi.number().required(),

  totalDepth: Joi.number().required(),

  turbingSize: Joi.number().required(),

  flowStation: Joi.string().required(),
});
