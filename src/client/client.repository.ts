import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './schema/client.schema';
import mongoose, { Model, FilterQuery, Mongoose } from 'mongoose';
import { IClient } from './dto/client.dto';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Client>): Promise<Client | null> {
    return this.clientModel.findOne(useFilterQuery);
  }

  async findOneAndDelete(id: string): Promise<Client | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.clientModel.findByIdAndDelete(objectId);
  }
  async findAll(useFilterQuery: FilterQuery<Client>): Promise<Client[] | null> {
    return this.clientModel.find(useFilterQuery);
  }

  async create(user: IClient): Promise<Client> {
    const newUser = new this.clientModel(user);
    return newUser.save();
  }

  async updateOne(id: string, user: Partial<Client>): Promise<Client | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.clientModel.findOneAndUpdate(objectId, user);
  }
}
