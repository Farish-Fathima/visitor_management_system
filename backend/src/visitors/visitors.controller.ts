
import { Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { VisitorsService } from './visitors.service.js';
import { Visitor } from './visitor.entity.js';

@Controller('visitors')
export class VisitorsController {
  constructor(private visitorsService: VisitorsService) {}

  // CREATE
  @Post()
  create(@Body() visitor: Partial<Visitor>) {
    return this.visitorsService.create(visitor);
  }

  // READ
  @Get()
  findAll() {
    return this.visitorsService.findAll();
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() visitor: Partial<Visitor>,
  ) {
    return this.visitorsService.update(id, visitor);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitorsService.remove(id);
  }
}
