import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Client } from './schema/client.schema';
import { v4 as uuidv4 } from 'uuid';
import {
  IClient,
  IClientCreateRequest,
  PartialClient,
  UpdateClientDto,
} from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async getUserById(clientId: string): Promise<Client | null> {
    return this.clientRepository.findOne({ clientId });
  }
  async deleteClientById(clientId: string): Promise<Client | null> {
    return this.clientRepository.findOneAndDelete(clientId);
  }
  async getAllUsers(): Promise<Client[] | null> {
    return this.clientRepository.findAll({});
  }
  async createUser(data: IClientCreateRequest): Promise<Client | null> {
    return this.clientRepository.create({
      clientId: uuidv4(),
      email: data.email,
      image: data.image ? data.image : '',
      name: data.name,
      address: data.address,
      adminId: data.adminId,
      contactPerson: data.contactPerson,
      mobile: data.mobile,
      ownerId: data.ownerId,
      website: data.website,
    });
  }

  async updateUser(
    clientId: string,
    client: PartialClient,
  ): Promise<Client | null> {
    return this.clientRepository.updateOne(clientId, client);
  }
}
