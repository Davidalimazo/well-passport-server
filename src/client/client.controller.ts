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
import { ClientService } from './client.service';
import { Client } from './schema/client.schema';
import {
  UpdateClientDto,
  IClientCreateRequest,
  createClientSchema,
} from './dto/client.dto';
import { Public } from 'src/utils/guard';
import { JoiValidationPipe } from 'src/utils/validator';

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
  @UsePipes(new JoiValidationPipe(createClientSchema))
  createUser(
    @Request() request,
    @Body() client: IClientCreateRequest,
  ): Promise<Client | null> {
    return this.clientService.createUser(client, request.user._id);
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
