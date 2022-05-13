import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { AR } from 'src/locale/ar';

export class CreateDepartmentDto {
  // ----------------------------------------------------------------------------------- //
  @ApiProperty({type: String, description: 'department code'})
  dep_code: string;
  // ----------------------------------------------------------------------------------- //
  @IsNotEmpty({message: AR.IsNotEmpty})
  @IsString({message: AR.IsString})
  @ApiProperty({type: String, description: 'department name'})
  dep_name: string;
  // ----------------------------------------------------------------------------------- //
  user : User;
  // ----------------------------------------------------------------------------------- //
}
