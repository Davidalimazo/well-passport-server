import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RecycleRepository } from './recycle.repository';
import { Recycle } from './schema/recycle.schema';
import { v4 as uuidv4 } from 'uuid';
import {
  IRecycle,
  IRecycleCreateRequest,
  PartialRecycle,
  UpdateRecycleDto,
} from './dto/recycle.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class RecycleService {
  constructor(private readonly recycleRepository: RecycleRepository) {}

  async getUserById(recycleId: string): Promise<Recycle | null> {
    return this.recycleRepository.findOne({ recycleId });
  }
  async deleteRecycleById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId))
      return this.recycleRepository.findOneAndDelete(clientId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
  async deleteAllRecycleClientById(clientId: string): Promise<any> {
    if (isValidObjectId(clientId))
      return this.recycleRepository.deleteAllRecycleByClientId(clientId);
    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }

  async getClientRecycles(clientId: string): Promise<Recycle[] | null> {
    return this.recycleRepository.findRecycleByClientId(clientId);
  }
  async getAllUsers(): Promise<Recycle[] | null> {
    return this.recycleRepository.findAll({});
  }
  async createUser(
    data: IRecycleCreateRequest,
    adminId: string,
  ): Promise<Recycle | null> {
    return this.recycleRepository.create({
      recycleId: uuidv4(),
      image: data.image ? data.image : '',
      name: data.name,
      adminId: adminId,
    });
  }

  async updateUser(recycleId: string, client: PartialRecycle): Promise<any> {
    if (isValidObjectId(recycleId))
      return this.recycleRepository.updateOne(recycleId, client);

    return new HttpException('not a valid id', HttpStatus.BAD_REQUEST);
  }
}
