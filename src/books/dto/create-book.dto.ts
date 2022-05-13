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
import { User } from 'src/users/entities/user.entity';
import { IsNull } from 'typeorm';
import { FileTypes, BookState, ReportType } from '../enums/bookType';

export class CreateReportDto {
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, nullable: true, description: 'bookName' })
  bookName: string;
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty()
  @ApiProperty({ type: String, nullable: true, description: 'bookPublishDate' })
  bookPublishDate: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, description: 'authorName' })
  authorName: string;
  // ----------------------------------------------------------------------------------- //
  @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true, description: 'bookPages' })
  bookPages: number;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, description: 'bookPublisher' })
  bookPublisher: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, description: 'bookDescription' })
  bookDescription: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsEnum(BookState)
  @IsNotEmpty()
  @ApiProperty({ type: String, enum: BookState })
  state: string;
  // ----------------------------------------------------------------------------------- //
  // report attach
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, nullable: true })
  bookFilePath: string;
  // ----------------------------------------------------------------------------------- //
  // report file type
  @IsOptional()
  @IsString()
  @IsEnum(FileTypes)
  @IsNotEmpty()
  @ApiProperty({ type: String, enum: FileTypes })
  fileType: string;
  // ----------------------------------------------------------------------------------- //
  // @IsString()
  // @IsEnum(FileTypes)
  // @IsNotEmpty()
  // @ApiProperty({ type: String, nullable: true, description: 'returnDate' })
  // returnDate : string;
  // ----------------------------------------------------------------------------------- //
  user : User;
}
