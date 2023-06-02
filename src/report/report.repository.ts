import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportDocument } from './schema/report.schema';
import mongoose, { Model, FilterQuery, Mongoose } from 'mongoose';
import { IReport } from './dto/report.dto';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Report>): Promise<Report | null> {
    return this.reportModel.findOne(useFilterQuery);
  }

  async findOneAndDelete(id: string): Promise<Report | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.reportModel.findByIdAndDelete(objectId);
  }
  async findAll(useFilterQuery: FilterQuery<Report>): Promise<Report[] | null> {
    return this.reportModel.find(useFilterQuery);
  }

  async findReportByClientId(clientId: string): Promise<Report[] | null> {
    return this.reportModel.find({ clientId });
  }
  async findReportByProjectId(projectId: string): Promise<Report[] | null> {
    return this.reportModel.find({ projectId });
  }

  async findReportByFieldId(fieldId: string): Promise<Report[] | null> {
    return this.reportModel.find({ fieldId });
  }

  async deleteAllReportByClientId(clientId: string): Promise<any> {
    return this.reportModel.deleteMany({ clientId });
  }

  async deleteAllReportByFieldId(fieldId: string): Promise<any> {
    return this.reportModel.deleteMany({ fieldId });
  }

  async create(user: IReport): Promise<Report> {
    const newUser = new this.reportModel(user);
    return newUser.save();
  }

  async updateOne(id: string, user: Partial<Report>): Promise<Report | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.reportModel.findOneAndUpdate(objectId, user);
  }
}
