import { Report } from '../schema/report.schema';
import * as Joi from 'joi';

export interface UpdateReportDto {
  name: string;

  author: string;

  image: string;
}

export interface IReport extends Report {}

export type PartialReport = Partial<Report>;

export interface IReportCreateRequest {
  fieldId: string;

  clientId: string;

  projectId: string;

  name: string;

  author: string;

  image?: string;

  wellId: string;
}

export const createReportSchema = Joi.object({
  fieldId: Joi.string().required(),

  clientId: Joi.string().required(),

  name: Joi.string().required(),

  author: Joi.string().required(),

  projectId: Joi.string().required(),

  wellId: Joi.string().required(),

  image: Joi.string(),
});
