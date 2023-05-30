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
import { WellService } from './well.service';
import { Well } from './schema/well.schema';
import {
  UpdateWellDto,
  IWellCreateRequest,
  createWellSchema,
} from './dto/well.dto';
import { Public } from 'src/utils/guard';
import { JoiValidationPipe } from 'src/utils/validator';

@Controller('well')
export class WellController {
  constructor(private readonly wellService: WellService) {}
  @Get(':wellId')
  getUserById(@Param('wellId') wellId: string): Promise<Well | null> {
    return this.wellService.getUserById(wellId);
  }
  @Get('client/:clientId')
  getAllClientWells(
    @Param('clientId') clientId: string,
  ): Promise<Well[] | null> {
 
    return this.wellService.getClientWells(clientId);
  }

  @Delete('client/:clientId')
  deleteAllWellByClientId(@Param('clientId') clientId: string): Promise<any> {
    
    return this.wellService.deleteAllWellClientById(clientId);
  }

  @Get('field/:fieldId')
  getAllFieldWells(@Param('fieldId') fieldId: string): Promise<Well[] | null> {
    return this.wellService.getFieldWells(fieldId);
  }

  @Delete('client/:fieldId')
  deleteAllWellByFieldId(@Param('fieldId') fieldId: string): Promise<any> {
    return this.wellService.deleteAllWellClientById(fieldId);
  }

  @Get()
  getAllUser(): Promise<Well[] | null> {
    return this.wellService.getAllUsers();
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(createWellSchema))
  createUser(
    @Request() request,
    @Body() well: IWellCreateRequest,
  ): Promise<Well | null> {
    return this.wellService.createUser(well, request.user._id);
  }

  @Delete(':wellId')
  deleteWell(@Param('wellId') wellId): Promise<Well | null> {
    return this.wellService.deleteWellById(wellId);
  }

  @Patch(':wellId')
  updateUser(
    @Request() request,
    @Param('wellId') wellId: string,
    @Body() client: Partial<UpdateWellDto>,
  ): Promise<Well | null> {
    return this.wellService.updateUser(wellId, client);
  }
}
