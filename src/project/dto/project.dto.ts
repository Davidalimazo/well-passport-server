import { Project } from '../schema/project.schema';
import * as Joi from 'joi';

export interface UpdateProjectDto {
  name: string;

  numberOfProjects: number;

  image: string;

  longitude: number;

  latitude: number;
}

export interface IProject extends Project {}

export type PartialProject = Partial<Project>;

export interface IProjectCreateRequest {
  fieldId: string;

  clientId: string;

  name: string;

  description: string;

  image: string;

  rig: string;

  startDate: Date;
  endDate: Date;
  wellId: string;
}

export const createProjectSchema = Joi.object({
  fieldId: Joi.string().required(),

  clientId: Joi.string().required(),

  name: Joi.string().required(),

  description: Joi.string().required(),
  wellId: Joi.string().required(),

  rig: Joi.string().required(),

  image: Joi.string(),

  startDate: Joi.date().required(),

  endDate: Joi.date().required(),
});
