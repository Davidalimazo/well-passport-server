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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './schema/client.schema';
import {
  UpdateClientDto,
  IClientCreateRequest,
  createClientSchema,
} from './dto/client.dto';
import { Public } from 'src/utils/guard';
import { JoiValidationPipe } from 'src/utils/validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'config/multer.config';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Get(':clientId')
  getUserById(@Param('clientId') clientId: string): Promise<Client | null> {
    return this.clientService.getUserById(clientId);
  }

  @Get()
  getAllUser(): Promise<Client[] | null> {
    return this.clientService.getAllUsers();
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(createClientSchema))
  @UseInterceptors(FileInterceptor('file', { ...multerConfig }))
  createUser(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
    @Body() client: IClientCreateRequest,
  ) {
    const newClient = { ...client, image: file.path };

    return this.clientService.createUser(newClient, request.user._id);
  }

  @Delete(':clientId')
  deleteClient(@Param('clientId') clientId): Promise<Client | null> {
    return this.clientService.deleteClientById(clientId);
  }

  @Patch(':clientId')
  updateUser(
    @Param('clientId') clientId: string,
    @Body() client: Partial<UpdateClientDto>,
  ): Promise<Client | null> {
    return this.clientService.updateUser(clientId, client);
  }
}
