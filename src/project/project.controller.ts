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
import { ProjectService } from './project.service';
import { Project } from './schema/project.schema';
import {
  UpdateProjectDto,
  IProjectCreateRequest,
  createProjectSchema,
} from './dto/project.dto';
import { Public } from 'src/utils/guard';
import { JoiValidationPipe } from 'src/utils/validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'config/multer.config';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get(':projectId')
  getUserById(@Param('projectId') projectId: string): Promise<Project | null> {
    return this.projectService.getUserById(projectId);
  }
  @Get('client/:clientId')
  getAllClientProjects(
    @Param('clientId') clientId: string,
  ): Promise<Project[] | null> {
    console.log(clientId);
    return this.projectService.getClientProjects(clientId);
  }
  @Get('well/:wellId')
  getAllWellProjects(
    @Param('wellId') wellId: string,
  ): Promise<Project[] | null> {
    return this.projectService.getWellProjects(wellId);
  }

  @Delete('client/:clientId')
  deleteAllProjectByClientId(
    @Param('clientId') clientId: string,
  ): Promise<any> {
    return this.projectService.deleteAllProjectClientById(clientId);
  }

  @Get()
  getAllUser(): Promise<Project[] | null> {
    return this.projectService.getAllUsers();
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(createProjectSchema))
  @UseInterceptors(FileInterceptor('file', { ...multerConfig }))
  createUser(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
    @Body() project: IProjectCreateRequest,
  ) {
    const newProject = { ...project, image: file.path };
    return this.projectService.createUser(newProject, request.user._id);
  }

  @Delete(':projectId')
  deleteProject(@Param('projectId') projectId): Promise<Project | null> {
    return this.projectService.deleteProjectById(projectId);
  }

  @Patch(':projectId')
  updateUser(
    @Param('projectId') projectId: string,
    @Body() project: Partial<UpdateProjectDto>,
  ): Promise<Project | null> {
    return this.projectService.updateUser(projectId, project);
  }
}
