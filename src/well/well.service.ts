import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WellRepository } from './well.repository';
import { Well } from './schema/well.schema';
import { v4 as uuidv4 } from 'uuid';
import {
  IWell,
  IWellCreateRequest,
  PartialWell,
  UpdateWellDto,
} from './dto/well.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class WellService {
  constructor(private readonly wellRepository: WellRepository) {}

  async getUserById(wellId: string): Promise<Well | null> {
    return this.wellRepository.findOne({ wellId });
  }
  async deleteWellById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId))
      return this.wellRepository.findOneAndDelete(clientId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
  async deleteAllWellClientById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId))
      return this.wellRepository.deleteAllWellByClientId(clientId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }

  async getClientWells(clientId: string): Promise<Well[] | null> {
    return this.wellRepository.findWellByClientId(clientId);
  }

  async getFieldWells(fieldId: string): Promise<Well[] | null> {
    return this.wellRepository.findWellByFieldId(fieldId);
  }
  async getAllUsers(): Promise<Well[] | null> {
    return this.wellRepository.findAll({});
  }
  async createUser(data: IWellCreateRequest, adminId:string): Promise<Well | null> {
    return this.wellRepository.create({
      wellId: uuidv4(),
      adminId: adminId,
      bitSize: data.bitSize,
      casting: data.casting,
      clientId: data.clientId,
      fieldId: data.fieldId,
      firstProductionDate: data.firstProductionDate,
      flowStation: data.flowStation,
      image: data.image ? data?.image : '',
      initialCompletionDate: data.initialCompletionDate,
      latitude: data.latitude,
      longitude: data.longitude,
      name: data.name,
      spudDate: data.spudDate,
      status: data.status,
      totalDepth: data.totalDepth,
      treeSpecs: data.treeSpecs,
      turbingSize: data.turbingSize,
      wellType: data.wellType,
    });
  }

  async updateUser(wellId: string, client: PartialWell): Promise<any> {
    if (isValidObjectId(wellId))
      return this.wellRepository.updateOne(wellId, client);

    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
}
