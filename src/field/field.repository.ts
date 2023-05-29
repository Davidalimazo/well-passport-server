import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Field, FieldDocument } from './schema/field.schema';
import mongoose, { Model, FilterQuery, Mongoose } from 'mongoose';
import { IField } from './dto/field.dto';

@Injectable()
export class FieldRepository {
  constructor(
    @InjectModel(Field.name) private clientModel: Model<FieldDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Field>): Promise<Field | null> {
    return this.clientModel.findOne(useFilterQuery);
  }

  async findOneAndDelete(id: string): Promise<Field | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.clientModel.findByIdAndDelete(objectId);
  }
  
  async findAll(useFilterQuery: FilterQuery<Field>): Promise<Field[] | null> {
    return this.clientModel.find(useFilterQuery);
  }

  async findFieldByClientId(clientId: string): Promise<Field[] | null> {
    return this.clientModel.find({ clientId });
  }

  async deleteAllFieldByClientId(clientId: string): Promise<any> {
    return this.clientModel.deleteMany({ clientId });
  }

  async create(user: IField): Promise<Field> {
    const newUser = new this.clientModel(user);
    return newUser.save();
  }

  async updateOne(id: string, user: Partial<Field>): Promise<Field | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.clientModel.findOneAndUpdate(objectId, user);
  }
}
