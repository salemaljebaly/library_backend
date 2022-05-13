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
import { AR } from 'src/locale/ar';
import { User } from 'src/users/entities/user.entity';
import { IsNull } from 'typeorm';
import { FileTypes, BookState, ReportType } from '../enums/bookType';

export class CreateBookDto {
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'bookName' })
  bookName: string;
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'bookPublishDate' })
  bookPublishDate: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'authorName' })
  authorName: string;
  // ----------------------------------------------------------------------------------- //
  @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'bookPages' })
  bookPages: number;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'bookPublisher' })
  bookPublisher: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'bookDescription' })
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
  @ApiProperty({ type: String})
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
  // @ApiProperty({ type: String description: 'returnDate' })
  // returnDate : string;
  // ----------------------------------------------------------------------------------- //
  user : User;
}
