import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  Request
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

  @Delete('client/:clientId')
  deleteAllProjectByClientId(
    @Param('clientId') clientId: string,
  ): Promise<any> {
    console.log(clientId);
    return this.projectService.deleteAllProjectClientById(clientId);
  }

  @Get()
  getAllUser(): Promise<Project[] | null> {
    return this.projectService.getAllUsers();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createProjectSchema))
  createUser(@Request() request, @Body() project: IProjectCreateRequest): Promise<Project | null> {
    return this.projectService.createUser(project, request.user.user._id);
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
