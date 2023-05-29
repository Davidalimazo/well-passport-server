import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recycle, RecycleDocument } from './schema/recycle.schema';
import mongoose, { Model, FilterQuery, Mongoose } from 'mongoose';
import { IRecycle } from './dto/recycle.dto';

@Injectable()
export class RecycleRepository {
  constructor(
    @InjectModel(Recycle.name) private recycleModel: Model<RecycleDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Recycle>): Promise<Recycle | null> {
    return this.recycleModel.findOne(useFilterQuery);
  }

  async findOneAndDelete(id: string): Promise<Recycle | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.recycleModel.findByIdAndDelete(objectId);
  }
  async findAll(
    useFilterQuery: FilterQuery<Recycle>,
  ): Promise<Recycle[] | null> {
    return this.recycleModel.find(useFilterQuery);
  }

  async findRecycleByClientId(clientId: string): Promise<Recycle[] | null> {
    return this.recycleModel.find({ clientId });
  }

  async findRecycleByFieldId(fieldId: string): Promise<Recycle[] | null> {
    return this.recycleModel.find({ fieldId });
  }

  async deleteAllRecycleByClientId(clientId: string): Promise<any> {
    return this.recycleModel.deleteMany({ clientId });
  }

  async deleteAllRecycleByFieldId(fieldId: string): Promise<any> {
    return this.recycleModel.deleteMany({ fieldId });
  }

  async create(user: IRecycle): Promise<Recycle> {
    const newUser = new this.recycleModel(user);
    return newUser.save();
  }

  async updateOne(id: string, user: Partial<Recycle>): Promise<Recycle | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.recycleModel.findOneAndUpdate(objectId, user);
  }
}
