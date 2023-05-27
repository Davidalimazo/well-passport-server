import { Client } from '../schema/client.schema';

export interface UpdateClientDto {
  name: string;

  contactPerson: string;

  mobile: string;

  image?: string;

  website: string;
}

export interface IClient extends Client {}

export type PartialClient = Partial<Client>;

export interface IClientCreateRequest {
  name: string;

  contactPerson: string;

  mobile: string;

  image?: string;

  email: string;

  address: string;

  adminId: string;

  ownerId: string;

  website: string;
}
