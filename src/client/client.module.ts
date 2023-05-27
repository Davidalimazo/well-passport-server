import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schema/client.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
