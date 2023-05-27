import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './schema/client.schema';
import { UpdateClientDto, IClientCreateRequest } from './dto/client.dto';
import { Public } from 'src/utils/guard';

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
  createUser(@Body() client: IClientCreateRequest): Promise<Client | null> {
    return this.clientService.createUser(client);
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
