import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from './schema/report.schema';
import {
  UpdateReportDto,
  IReportCreateRequest,
  createReportSchema,
} from './dto/report.dto';
import { Public } from 'src/utils/guard';
import { JoiValidationPipe } from 'src/utils/validator';
import { multerConfig } from 'config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get(':reportId')
  getUserById(@Param('reportId') reportId: string): Promise<Report | null> {
    return this.reportService.getUserById(reportId);
  }
  @Get('client/:clientId')
  getAllClientReports(
    @Param('reportId') reportId: string,
  ): Promise<Report[] | null> {
    return this.reportService.getClientReports(reportId);
  }
  @Get('project/:projectId')
  getAllProjectReports(
    @Param('projectId') projectId: string,
  ): Promise<Report[] | null> {
    return this.reportService.getProjectReports(projectId);
  }

  @Delete('client/:clientId')
  deleteAllReportByClientId(@Param('reportId') reportId: string): Promise<any> {
    return this.reportService.deleteAllReportClientById(reportId);
  }

  @Get()
  getAllUser(): Promise<Report[] | null> {
    return this.reportService.getAllUsers();
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(createReportSchema))
  @UseInterceptors(FileInterceptor('file', { ...multerConfig }))
  createUser(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
    @Body() report: IReportCreateRequest,
  ) {
    const newReport = { ...report, image: file.path };

    return this.reportService.createUser(newReport, request.user._id);
  }

  @Delete(':reportId')
  deleteReport(@Param('reportId') reportId): Promise<Report | null> {
    return this.reportService.deleteReportById(reportId);
  }

  @Patch(':reportId')
  updateUser(
    @Param('reportId') reportId: string,
    @Body() report: Partial<UpdateReportDto>,
  ): Promise<Report | null> {
    return this.reportService.updateUser(reportId, report);
  }
}
