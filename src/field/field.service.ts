import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FieldRepository } from './field.repository';
import { Field } from './schema/field.schema';
import { v4 as uuidv4 } from 'uuid';
import {
  IField,
  IFieldCreateRequest,
  PartialField,
  UpdateFieldDto,
} from './dto/field.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class FieldService {
  constructor(private readonly fieldRepository: FieldRepository) {}

  async getUserById(fieldId: string): Promise<Field | null> {
    return this.fieldRepository.findOne({ fieldId });
  }
  async deleteFieldById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId))
      return this.fieldRepository.findOneAndDelete(clientId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
  async deleteAllFieldClientById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId))
      return this.fieldRepository.deleteAllFieldByClientId(clientId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }

  async getClientFields(clientId: string): Promise<Field[] | null> {
    return this.fieldRepository.findFieldByClientId(clientId);
  }

  async getAllUsers(): Promise<Field[] | null> {
    return this.fieldRepository.findAll({});
  }

  async createUser(
    data: IFieldCreateRequest,
    adminId: string,
  ): Promise<Field | null> {
    return this.fieldRepository.create({
      fieldId: uuidv4(),
      image: data.image ? data.image : '',
      name: data.name,
      adminId: adminId,
      clientId: data.clientId,
      latitude: data.latitude,
      longitude: data.longitude,
      numberOfWells: data.numberOfWells,
      superintendent: data.superintendent,
    });
  }

  async updateUser(fieldId: string, client: PartialField): Promise<any> {
    if (isValidObjectId(fieldId))
      return this.fieldRepository.updateOne(fieldId, client);

    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
}
