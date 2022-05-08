import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  // ----------------------------------------------------------------------------------- //
  @ApiProperty({type: String, description: 'department code'})
  dep_code: string;
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type: String, description: 'department name'})
  dep_name: string;
  // ----------------------------------------------------------------------------------- //
}
