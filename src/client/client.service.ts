import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Client } from './schema/client.schema';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {
  IClient,
  IClientCreateRequest,
  PartialClient,
  UpdateClientDto,
} from './dto/client.dto';
import { isValidObjectId } from 'mongoose';
import { FieldRepository } from 'src/field/field.repository';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly fieldRepository: FieldRepository,
  ) {}

  async getUserById(clientId: string): Promise<Client | null> {
    return this.clientRepository.findOne({ clientId });
  }
  async deleteClientById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId)) {
      const client = await this.clientRepository.findOne({ _id: clientId });

      let img = client.image.split('\\')[1];

      fs.unlink(path.join('uploads/' + img), (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }

    const res = await this.clientRepository.findOneAndDelete(clientId);

    if (!res.email)
      return new HttpException('Error deleting client', HttpStatus.BAD_GATEWAY);

    //@ts-ignore
    let id = res._id.toString();

    let deleteFields = this.fieldRepository.deleteAllFieldByClientId(id);

    return deleteFields;
  }
  async getAllUsers(): Promise<Client[] | null> {
    return this.clientRepository.findAll({});
  }
  async createUser(data: IClientCreateRequest, adminId: string): Promise<any> {
    console.log(data.email);
    const exist = await this.clientRepository.findOne({ email: data.email });
    if (exist?.email)
      return new HttpException('Client already exit', HttpStatus.BAD_REQUEST);

    const created = await this.clientRepository.create({
      clientId: uuidv4(),
      email: data.email,
      image: data.image ? data.image : '',
      name: data.name,
      address: data.address,
      adminId: adminId,
      contactPerson: data.contactPerson,
      mobile: data.mobile,
      ownerId: data.ownerId,
      website: data.website,
    });

    return {
      message: 'Client created successfully',
      token: '00',
    };
  }

  async updateUser(clientId: string, client: PartialClient): Promise<any> {
    if (!isValidObjectId(clientId))
      return new HttpException('Invalid client id', HttpStatus.BAD_REQUEST);
    const res = await this.clientRepository.updateOne(clientId, client);

    if (!res.email)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return {
      message: 'Client updated successfully',
      token: '00',
    };
  }
}
