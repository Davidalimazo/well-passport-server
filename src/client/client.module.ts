import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schema/client.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { FieldModule } from 'src/field/field.module';
import { FieldService } from 'src/field/field.service';
import { FieldRepository } from 'src/field/field.repository';
import { Field, FieldSchema } from 'src/field/schema/field.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Field.name, schema: FieldSchema },
    ]),
    FieldModule,
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, FieldService, FieldRepository],
})
export class ClientModule {}
