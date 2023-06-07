import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './schema/project.schema';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {
  IProject,
  IProjectCreateRequest,
  PartialProject,
  UpdateProjectDto,
} from './dto/project.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getUserById(projectId: string): Promise<Project | null> {
    return this.projectRepository.findOne({ projectId });
  }
  async deleteProjectById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId)) {
      const report = await this.projectRepository.findOne({ _id: clientId });

      let img = report.image.split('\\')[1];

      fs.unlink(path.join('uploads/' + img), (err) => {
        if (err) {
          console.error(err);
          return err;
        } else {
          return this.projectRepository.findOneAndDelete(clientId);
        }
      });
    }

    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
  async deleteAllProjectClientById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId))
      return this.projectRepository.deleteAllProjectByClientId(clientId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }

  async getClientProjects(clientId: string): Promise<Project[] | null> {
    return this.projectRepository.findProjectByClientId(clientId);
  }
  async getWellProjects(wellId: string): Promise<Project[] | null> {
    return this.projectRepository.findProjectByWellId(wellId);
  }
  async getAllUsers(): Promise<Project[] | null> {
    return this.projectRepository.findAll({});
  }
  async createUser(
    data: IProjectCreateRequest,
    adminId: string,
  ): Promise<Project | null> {
    return this.projectRepository.create({
      projectId: uuidv4(),
      image: data.image ? data.image : '',
      name: data.name,
      adminId: adminId,
      clientId: data.clientId,
      description: data.description,
      endDate: data.endDate,
      fieldId: data.fieldId,
      rig: data.rig,
      startDate: data.startDate,
      wellId: data.wellId,
      status: data.status,
    });
  }

  async updateUser(projectId: string, client: PartialProject): Promise<any> {
    if (isValidObjectId(projectId))
      return this.projectRepository.updateOne(projectId, client);

    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
}
