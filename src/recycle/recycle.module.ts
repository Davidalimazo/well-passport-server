import { Module } from '@nestjs/common';
import { RecycleController } from './recycle.controller';
import { RecycleService } from './recycle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recycle, RecycleSchema } from './schema/recycle.schema';
import { RecycleRepository } from './recycle.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recycle.name, schema: RecycleSchema }]),
  ],
  controllers: [RecycleController],
  providers: [RecycleService, RecycleRepository],
  exports: [RecycleService],
})
export class RecycleModule {}
