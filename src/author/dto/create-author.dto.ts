import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  // ----------------------------------------------------------------------------------- //
  @ApiProperty({type: String, description: 'full name'})
  full_name: string;
  // ----------------------------------------------------------------------------------- //
}
