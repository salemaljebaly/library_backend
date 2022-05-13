import { Module } from '@nestjs/common';
import { BarrowService } from './barrow.service';
import { BarrowController } from './barrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barrow } from './entities/barrow.entity';
import { Members } from 'src/members/entities/members.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barrow, Members, Book])],
  controllers: [BarrowController],
  providers: [BarrowService]
})
export class BarrowModule {}
