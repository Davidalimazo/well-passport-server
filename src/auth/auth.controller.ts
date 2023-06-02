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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';
import { User } from './schema/users.schema';
import {
  IAccount,
  ILogin,
  IResponse,
  IUsers,
  UpdateDto,
  changePasswordDto,
  createuserSchema,
  loginSchema,
  updateUserSchema,
} from './dto/users.dto';
import { JoiValidationPipe } from 'src/utils/validator';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/utils/guard';
import { multerConfig } from 'config/multer.config';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard)
  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<IResponse | null> {
    return this.authService.getUserById(userId);
  }
  @UseGuards(AuthGuard)
  @Get('image/:userId')
  getUserImageById(@Param('userId') userId: string): Promise<IResponse | null> {
    return this.authService.getUserImageById(userId);
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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  @UsePipes(new JoiValidationPipe(createuserSchema))
  createUser(
    @Request() request,
    @Body() user: IAccount,
  ): Promise<IResponse | null> {
    return this.authService.createUser(user, request.user._id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('changepassword/:userId')
  changePassword(
    @Param('userId') userId: string,
    @Body() user: changePasswordDto,
  ): Promise<any> {
    return this.authService.changePassword(userId, user);
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', { ...multerConfig }))
  @Patch('upload-image/:userId')
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    const updateRecords = { image: file.path };
    return this.authService.uploadImage(userId, updateRecords);
  }
}
