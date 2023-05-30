import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schema/project.schema';
import mongoose, { Model, FilterQuery, Mongoose } from 'mongoose';
import { IProject } from './dto/project.dto';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Project>): Promise<Project | null> {
    return this.projectModel.findOne(useFilterQuery);
  }

  async findOneAndDelete(id: string): Promise<Project | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.projectModel.findByIdAndDelete(objectId);
  }
  async findAll(
    useFilterQuery: FilterQuery<Project>,
  ): Promise<Project[] | null> {
    return this.projectModel.find(useFilterQuery);
  }

  async findProjectByClientId(clientId: string): Promise<Project[] | null> {
    return this.projectModel.find({ clientId });
  }

  async findProjectByFieldId(fieldId: string): Promise<Project[] | null> {
    return this.projectModel.find({ fieldId });
  }

  async findProjectByWellId(wellId: string): Promise<Project[] | null> {
    return this.projectModel.find({ wellId });
  }

  async deleteAllProjectByClientId(clientId: string): Promise<any> {
    return this.projectModel.deleteMany({ clientId });
  }

  async deleteAllProjectByFieldId(fieldId: string): Promise<any> {
    return this.projectModel.deleteMany({ fieldId });
  }

  async create(user: IProject): Promise<Project> {
    const newUser = new this.projectModel(user);
    return newUser.save();
  }

  async updateOne(id: string, user: Partial<Project>): Promise<Project | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.projectModel.findOneAndUpdate(objectId, user);
  }
}
