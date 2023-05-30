import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { User } from './schema/users.schema';
import { v4 as uuidv4 } from 'uuid';
import { IAccount, ILogin, IResponse, PartialUsers } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailNotification } from 'src/utils/registerMail';
import { ConfigService } from '@nestjs/config';
import mongoose, { isValidObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getUserById(userId: string): Promise<any> {
    const user = await this.authRepository.findOneByUserId(userId);
    if (!user) return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
  async login(data: ILogin): Promise<any> {
    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) return new HttpException('Invalid email', 401);

    const hashed = await bcrypt.compare(data.password, user.password);

    if (!hashed)
      return new HttpException('Invalid password', HttpStatus.FORBIDDEN);

    delete user.password;

    const payload = {
      //@ts-ignore
      createdAt: user.createdAt,
      creatorId: user.creatorId,
      email: user.email,
      firstName: user.firstName,
      image: user.image,
      lastName: user.lastName,
      role: user.role,
      //@ts-ignore
      updatedAt: user.updatedAt,
      userId: user.userId,
      //@ts-ignore
      __v: user._v,
      //@ts-ignore
      _id: user._id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async deleteUserById(userId: string): Promise<IResponse | null> {
    return this.authRepository.findOneAndDelete(userId);
  }
  async getAllUsers(): Promise<IResponse[] | null> {
    return this.authRepository.findAll({});
  }
  async createUser(data: IAccount): Promise<IResponse | any> {
    const exist = await this.authRepository.findUserByEmail(data.email);

    if (exist)
      return new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    const passwordToken = uuidv4();

    const mail = new MailNotification(this.configService);

    const salt = await bcrypt.genSalt(10);

    const hashed = await bcrypt.hash(passwordToken, salt);

    const newUser = await this.authRepository.create({
      userId: uuidv4(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      creatorId: 'SUPERUSER',
      image: data.image ? data.image : '',
      password: hashed,
      role: data.role,
    });

    if (!newUser.email)
      return new HttpException(
        'Error creating new user, please try again',
        HttpStatus.BAD_GATEWAY,
      );

    await mail.sendVerificationRequest(
      data.email,
      passwordToken,
      data.role,
      data.firstName,
    );

    return {
      message: 'Account created successfully',
      token: '00',
    };
  }

  async updateUser(userId: string, user: PartialUsers): Promise<any> {
    if (isValidObjectId(userId)) {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);

        const hashed = await bcrypt.hash(user.password, salt);
        user.password = hashed;
      }
      const res = await this.authRepository.updateOne(userId, user);
      if (!res) new HttpException('User not found', HttpStatus.NOT_FOUND);
      return {
        message: 'Account Updated successfully',
        token: '00',
      };
    }
    return new HttpException('Not a valid user Id', HttpStatus.BAD_REQUEST);
  }
}
