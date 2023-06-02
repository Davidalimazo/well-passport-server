import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { Report } from './schema/report.schema';
import { v4 as uuidv4 } from 'uuid';
import {
  IReport,
  IReportCreateRequest,
  PartialReport,
  UpdateReportDto,
} from './dto/report.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async getUserById(reportId: string): Promise<Report | null> {
    return this.reportRepository.findOne({ reportId });
  }
  async deleteReportById(reportId: string): Promise<any> {
    if (isValidObjectId(reportId))
      return this.reportRepository.findOneAndDelete(reportId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
  async deleteAllReportClientById(reportId: string): Promise<any> {
    if (isValidObjectId(reportId))
      return this.reportRepository.deleteAllReportByClientId(reportId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }

  async getClientReports(reportId: string): Promise<Report[] | null> {
    return this.reportRepository.findReportByClientId(reportId);
  }
  async getProjectReports(reportId: string): Promise<Report[] | null> {
    return this.reportRepository.findReportByProjectId(reportId);
  }
  async getAllUsers(): Promise<Report[] | null> {
    return this.reportRepository.findAll({});
  }
  async createUser(
    data: IReportCreateRequest,
    adminId: string,
  ): Promise<Report | null> {
    return this.reportRepository.create({
      reportId: uuidv4(),
      image: data.image ? data.image : '',
      name: data.name,
      adminId: adminId,
      author: data.author,
      clientId: data.clientId,
      fieldId: data.fieldId,
      projectId: data.projectId,
      wellId: data.wellId,
    });
  }

  async updateUser(reportId: string, report: PartialReport): Promise<any> {
    if (isValidObjectId(reportId))
      return this.reportRepository.updateOne(reportId, report);

    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
}
