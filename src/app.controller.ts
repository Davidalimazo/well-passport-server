import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  postHello(@Body() data: any) {
    return data;
  }
  @Patch()
  patchHello(@Param() id: string, @Body() data: any) {
    return { id: id, data: data };
  }
}
