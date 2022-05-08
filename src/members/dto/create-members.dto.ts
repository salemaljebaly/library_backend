import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsBoolean, IsEmail, IsLatitude, IsLongitude, isLongitude, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { CreateDepartmentDto } from "src/department/dto/create-department.dto";
import { UpdateDepartmentDto } from "src/department/dto/update-department.dto";
import { Department } from "src/department/entities/department.entity";
import { Long } from "typeorm";
import { MemberType } from "../enum/memberType.enum";

export class CreateMemberDto {
    
    // ----------------------------------------------------------------------------------- //
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'firstname'})
    fullName: string;
    // ----------------------------------------------------------------------------------- //
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'username'})
    username: string;
    // ----------------------------------------------------------------------------------- //
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'email'})
    email: string;
    // ----------------------------------------------------------------------------------- //
    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'phone'})
    phone: string;
    // ----------------------------------------------------------------------------------- //
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'password'})
    password: string;
    // ----------------------------------------------------------------------------------- //    
    @IsBoolean()
    @ApiProperty({type: Boolean, description: 'isActive'})
    isActive: boolean;
    // ----------------------------------------------------------------------------------- //
    @IsString()
    @ApiProperty({type: String, description: 'city'})
    city : string
    // ----------------------------------------------------------------------------------- //
    @IsString()
    @IsEnum(MemberType)
    @IsNotEmpty()
    @ApiProperty({type: String, enum: MemberType, default : MemberType.Student})
    memberType: MemberType;
    // ----------------------------------------------------------------------------------- //
    department: Department; 
}
