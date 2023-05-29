import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Well, WellDocument } from './schema/well.schema';
import mongoose, { Model, FilterQuery, Mongoose } from 'mongoose';
import { IWell } from './dto/well.dto';

@Injectable()
export class WellRepository {
  constructor(@InjectModel(Well.name) private wellModel: Model<WellDocument>) {}

  async findOne(useFilterQuery: FilterQuery<Well>): Promise<Well | null> {
    return this.wellModel.findOne(useFilterQuery);
  }

  async findOneAndDelete(id: string): Promise<Well | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.wellModel.findByIdAndDelete(objectId);
  }
  async findAll(useFilterQuery: FilterQuery<Well>): Promise<Well[] | null> {
    return this.wellModel.find(useFilterQuery);
  }

  async findWellByClientId(clientId: string): Promise<Well[] | null> {
    return this.wellModel.find({ clientId });
  }

  async findWellByFieldId(fieldId: string): Promise<Well[] | null> {
    return this.wellModel.find({ fieldId });
  }

  async deleteAllWellByClientId(clientId: string): Promise<any> {
    return this.wellModel.deleteMany({ clientId });
  }

  async deleteAllWellByFieldId(fieldId: string): Promise<any> {
    return this.wellModel.deleteMany({ fieldId });
  }

  async create(user: IWell): Promise<Well> {
    const newUser = new this.wellModel(user);
    return newUser.save();
  }

  async updateOne(id: string, user: Partial<Well>): Promise<Well | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.wellModel.findOneAndUpdate(objectId, user);
  }
}
