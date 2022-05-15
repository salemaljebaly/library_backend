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
  @IsString({message: AR.IsString})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'bookName' })
  bookName: string;
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'bookPublishDate' })
  bookPublishDate: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsOptional()
  @ApiProperty({ type: String, description: 'authorName' })
  authorName: string;
  // ----------------------------------------------------------------------------------- //
  @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'bookPages' })
  bookPages: number;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsOptional()
  @ApiProperty({ type: String, description: 'bookPublisher' })
  bookPublisher: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsOptional()
  @ApiProperty({ type: String, description: 'bookDescription' })
  bookDescription: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsEnum(BookState, {message: AR.IsEnum})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, enum: BookState })
  state: string;
  // ----------------------------------------------------------------------------------- //
  // report attach
  @IsOptional()
  @IsString({message: AR.IsString})
  @ApiProperty({ type: String})
  bookFilePath: string;
  // ----------------------------------------------------------------------------------- //
  // report file type
  @IsOptional()
  @IsString({message: AR.IsString})
  @IsEnum(FileTypes, {message: AR.IsEnum})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, enum: FileTypes })
  fileType: string;
  // ----------------------------------------------------------------------------------- //
  @IsString({message: AR.IsString})
  @IsNotEmpty({message: AR.IsNotEmpty})
  @ApiProperty({ type: String, description: 'returnDate' })
  returnDate : string;
  // ----------------------------------------------------------------------------------- //
  user : User;
}
