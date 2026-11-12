
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { VisitorsModule } from './visitors/visitors.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'First_Project99',
      database: 'visitors_details',
      autoLoadEntities: true,
      synchronize: false,
    }),
    VisitorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

