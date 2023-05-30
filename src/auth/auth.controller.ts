import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from './schema/users.schema';
import {
  IAccount,
  ILogin,
  IResponse,
  IUsers,
  UpdateDto,
  createuserSchema,
  loginSchema,
  updateUserSchema,
} from './dto/users.dto';
import { JoiValidationPipe } from 'src/utils/validator';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/utils/guard';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard)
  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<IResponse | null> {
    return this.authService.getUserById(userId);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new JoiValidationPipe(loginSchema))
  login(@Body() data: ILogin): Promise<any> {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUser(): Promise<IResponse[] | null> {
    return this.authService.getAllUsers();
  }

  @Public()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  @UsePipes(new JoiValidationPipe(createuserSchema))
  createUser(
    @Request() request,
    @Body() user: IAccount,
  ): Promise<IResponse | null> {
    return this.authService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() user: Partial<UpdateDto>,
  ): Promise<IResponse | null> {
    return this.authService.updateUser(userId, user);
  }
}
