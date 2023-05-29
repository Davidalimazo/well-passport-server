import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schema/users.schema';
import mongoose, { Model, FilterQuery, isValidObjectId } from 'mongoose';
import { IResponse, IUsers } from './dto/users.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async findOneByUserId(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId });
  }
  async findOneByObjectId(id: string): Promise<User | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.userModel.findOne(objectId);
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findOneAndDelete(id: string): Promise<IResponse | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.userModel.findOneAndDelete(objectId);
  }
  async findAll(
    useFilterQuery: FilterQuery<User>,
  ): Promise<IResponse[] | null> {
    return this.userModel.find(useFilterQuery);
  }

  async create(user: IUsers): Promise<IResponse> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateOne(id: string, user: Partial<User>): Promise<IResponse | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.userModel.findOneAndUpdate(objectId, user);
  }
}
