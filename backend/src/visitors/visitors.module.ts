import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorsController } from './visitors.controller.js';
import { VisitorsService } from './visitors.service.js';
import { Visitor } from './visitor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor])],
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}

