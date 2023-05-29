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
import { FieldService } from './field.service';
import { Field } from './schema/field.schema';
import {
  UpdateFieldDto,
  IFieldCreateRequest,
  createFieldSchema,
} from './dto/field.dto';
import { Public } from 'src/utils/guard';
import { JoiValidationPipe } from 'src/utils/validator';

@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}
  @Get(':fieldId')
  getUserById(@Param('fieldId') fieldId: string): Promise<Field | null> {
    return this.fieldService.getUserById(fieldId);
  }
  @Get('client/:clientId')
  getAllClientFields(
    @Param('clientId') clientId: string,
  ): Promise<Field[] | null> {
    console.log(clientId);
    return this.fieldService.getClientFields(clientId);
  }

  @Delete('client/:clientId')
  deleteAllFieldByClientId(@Param('clientId') clientId: string): Promise<any> {
    console.log(clientId);
    return this.fieldService.deleteAllFieldClientById(clientId);
  }

  @Get()
  getAllUser(): Promise<Field[] | null> {
    return this.fieldService.getAllUsers();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createFieldSchema))
  createUser(
    @Request() req,
    @Body() client: IFieldCreateRequest,
  ): Promise<Field | null> {
    return this.fieldService.createUser(client, req.user._id);
  }

  @Delete(':fieldId')
  deleteField(@Param('fieldId') fieldId): Promise<Field | null> {
    return this.fieldService.deleteFieldById(fieldId);
  }

  @Patch(':fieldId')
  updateUser(
    @Param('fieldId') fieldId: string,
    @Body() client: Partial<UpdateFieldDto>,
  ): Promise<Field | null> {
    return this.fieldService.updateUser(fieldId, client);
  }
}
