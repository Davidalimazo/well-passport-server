import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { FieldModule } from './field/field.module';
import { WellModule } from './well/well.module';
import { ProjectModule } from './project/project.module';
import { ReportModule } from './report/report.module';
import { RecycleModule } from './recycle/recycle.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
        dbName: configService.get('database.dbName'),
      }),
    }),
    AuthModule,
    ClientModule,
    FieldModule,
    WellModule,
    ProjectModule,
    ReportModule,
    RecycleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
