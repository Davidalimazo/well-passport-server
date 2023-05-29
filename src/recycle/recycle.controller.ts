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
import { RecycleService } from './recycle.service';
import { Recycle } from './schema/recycle.schema';
import {
  UpdateRecycleDto,
  IRecycleCreateRequest,
  createRecycleSchema,
} from './dto/recycle.dto';
import { Public } from 'src/utils/guard';
import { JoiValidationPipe } from 'src/utils/validator';

@Controller('recycle')
export class RecycleController {
  constructor(private readonly recycleService: RecycleService) {}
  @Get(':recycleId')
  getUserById(@Param('recycleId') recycleId: string): Promise<Recycle | null> {
    return this.recycleService.getUserById(recycleId);
  }
  @Get('client/:clientId')
  getAllClientRecycles(
    @Param('clientId') clientId: string,
  ): Promise<Recycle[] | null> {
    console.log(clientId);
    return this.recycleService.getClientRecycles(clientId);
  }

  @Delete('client/:clientId')
  deleteAllRecycleByClientId(
    @Param('clientId') clientId: string,
  ): Promise<any> {
    console.log(clientId);
    return this.recycleService.deleteAllRecycleClientById(clientId);
  }

  @Get()
  getAllUser(): Promise<Recycle[] | null> {
    return this.recycleService.getAllUsers();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createRecycleSchema))
  createUser(
    @Request() request,
    @Body() client: IRecycleCreateRequest,
  ): Promise<Recycle | null> {
    return this.recycleService.createUser(client, request.user.user._id);
  }

  @Delete(':recycleId')
  deleteRecycle(@Param('recycleId') recycleId): Promise<Recycle | null> {
    return this.recycleService.deleteRecycleById(recycleId);
  }

  @Patch(':recycleId')
  updateUser(
    @Param('recycleId') recycleId: string,
    @Body() client: Partial<UpdateRecycleDto>,
  ): Promise<Recycle | null> {
    return this.recycleService.updateUser(recycleId, client);
  }
}
