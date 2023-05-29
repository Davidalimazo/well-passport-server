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
    console.log(reportId);
    return this.reportService.getClientReports(reportId);
  }

  @Delete('client/:clientId')
  deleteAllReportByClientId(@Param('reportId') reportId: string): Promise<any> {
    console.log(reportId);
    return this.reportService.deleteAllReportClientById(reportId);
  }

  @Get()
  getAllUser(): Promise<Report[] | null> {
    return this.reportService.getAllUsers();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createReportSchema))
  createUser(
    @Request() request,
    @Body() report: IReportCreateRequest,
  ): Promise<Report | null> {
    return this.reportService.createUser(report, request.user.user._id);
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
