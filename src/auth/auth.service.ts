import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { User } from './schema/users.schema';
import { v4 as uuidv4 } from 'uuid';
import { IAccount, ILogin, IResponse, PartialUsers } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailNotification } from 'src/utils/registerMail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getUserById(userId: string): Promise<IResponse | null> {
    return this.authRepository.findOneByUserId(userId);
  }
  async login(data: ILogin): Promise<any> {
    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) return new HttpException('Invalid email', 401);

    const hashed = await bcrypt.compare(data.password, user.password);

    if (!hashed)
      return new HttpException('Invalid password', HttpStatus.FORBIDDEN);

    const payload = { user };

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
      createdorId: data.createdorId,
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

    const payload = { newUser };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async updateUser(
    userId: string,
    user: PartialUsers,
  ): Promise<IResponse | null> {
    return this.authRepository.updateOne(userId, user);
  }
}
