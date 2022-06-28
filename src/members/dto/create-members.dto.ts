import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsBoolean, IsEmail, IsLatitude, IsLongitude, isLongitude, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { CreateDepartmentDto } from "src/department/dto/create-department.dto";
import { UpdateDepartmentDto } from "src/department/dto/update-department.dto";
import { Department } from "src/department/entities/department.entity";
import { AR } from "src/locale/ar";
import { User } from "src/users/entities/user.entity";
import { Long } from "typeorm";
import { MemberType } from "../enum/memberType.enum";

export class CreateMemberDto {
    
    // ----------------------------------------------------------------------------------- //
    @IsString({message: AR.IsString})
    @MinLength(3)
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'fullName'})
    fullName: string;
    // ----------------------------------------------------------------------------------- //
    @IsString({message: AR.IsString})
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'username'})
    username: string;
    // ----------------------------------------------------------------------------------- //
    @IsEmail({message: AR.IsEmail})
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'email'})
    email: string;
    // ----------------------------------------------------------------------------------- //
    @IsPhoneNumber('LY', {message: AR.IsPhoneNumber})
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'phone'})
    phone: string;
    // ----------------------------------------------------------------------------------- //
    @IsString({message: AR.IsString})
    @MinLength(6, {message: AR.MinLength})
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, description: 'password'})
    password: string;
    // ----------------------------------------------------------------------------------- //    
    @IsBoolean({message: AR.IsBoolean})
    @ApiProperty({type: Boolean, description: 'isActive'})
    isActive: boolean;
    // ----------------------------------------------------------------------------------- //
    @IsString({message: AR.IsString})
    @ApiProperty({type: String, description: 'city'})
    city : string
    // ----------------------------------------------------------------------------------- //
    @IsString({message: AR.IsString})
    @IsEnum(MemberType, {message : 'يجب ان يكون نوع المستخدم طالب أو أستاذ'})
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, enum: MemberType, default : MemberType.Student})
    memberType: MemberType;
    // ----------------------------------------------------------------------------------- //
    department: Department; 
    // ----------------------------------------------------------------------------------- //
    user : User;
    // ----------------------------------------------------------------------------------- //
}
