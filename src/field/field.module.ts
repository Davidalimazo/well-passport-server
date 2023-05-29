import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from './schema/field.schema';
import { FieldController } from './field.controller';
import { FieldService } from './field.service';
import { FieldRepository } from './field.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
  ],
  controllers: [FieldController],
  providers: [FieldService, FieldRepository],
  exports: [FieldService],
})
export class FieldModule {}
