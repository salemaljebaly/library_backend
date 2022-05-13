import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Members } from 'src/members/entities/members.entity';
import { IsNull } from 'typeorm';
import { FileTypes, BookState, ReportType } from '../enums/barrowType';

export class CreateBarrowDto {
    // ----------------------------------------------------------------------------------- //
  @ApiProperty({ type: String, nullable: true, description: 'returnDate from barrow' })
  returnDate: string;
  // ----------------------------------------------------------------------------------- //
  // @ApiProperty({ type: String, nullable: true, description: 'member' })
  // member : Members
  // ----------------------------------------------------------------------------------- //
  // @ApiProperty({ type: String, nullable: true, description: 'book' })
  // book : Book
  // ----------------------------------------------------------------------------------- //
}
