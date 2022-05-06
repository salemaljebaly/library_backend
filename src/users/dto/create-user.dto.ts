import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';

export class CreateUserDto {
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'fullName' })
  fullName: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  username: string;
  // ----------------------------------------------------------------------------------- //
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
  // ----------------------------------------------------------------------------------- //
  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'isActive' })
  isActive: boolean;
  // ----------------------------------------------------------------------------------- //
  @IsString()
  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({type: String, enum: Role, default : Role.User})
  role: Role;
  // ----------------------------------------------------------------------------------- //


}
