import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from './visitor.entity.js';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
  ) {}

  // CREATE
  create(visitor: Partial<Visitor>) {
    return this.visitorRepository.save(visitor);
  }

  // READ
  findAll() {
    return this.visitorRepository.find();
  }

  // UPDATE
  update(id: number, visitor: Partial<Visitor>) {
    return this.visitorRepository.update(id, visitor);
  }

  // DELETE
  remove(id: number) {
    return this.visitorRepository.delete(id);
  }
}

