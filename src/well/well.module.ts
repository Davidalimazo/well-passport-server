import { Module } from '@nestjs/common';
import { WellController } from './well.controller';
import { WellService } from './well.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Well, WellSchema } from './schema/well.schema';
import { WellRepository } from './well.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Well.name, schema: WellSchema }]),
  ],
  controllers: [WellController],
  providers: [WellService, WellRepository],
  exports: [WellService],
})
export class WellModule {}
