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
    @IsEmail({message: 'يجب ان يكون نوع الحقل ايميلا'})
    @IsNotEmpty({message: 'يجب ان لا يكون الحقل فارغا'})
    @ApiProperty({type: String, description: 'email'})
    email: string;
    // ----------------------------------------------------------------------------------- //
    @IsPhoneNumber('LY', {message: 'يجب أن يكون رقم الهاتف من دولة ليبيا'})
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'phone'})
    phone: string;
    // ----------------------------------------------------------------------------------- //
    @IsString({message: 'يجب ان يكون نوع الحقل نصي'})
    @MinLength(6, {message: 'يجب أن يكون الحقل اكبر من 6 خانات'})
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'password'})
    password: string;
    // ----------------------------------------------------------------------------------- //    
    @IsBoolean({message: 'يجب ان تكون حالة المستخدم اما مفعلة أو لا'})
    @ApiProperty({type: Boolean, description: 'isActive'})
    isActive: boolean;
    // ----------------------------------------------------------------------------------- //
    @IsString({message: 'يجب ان يكون نوع الحقل نصي'})
    @ApiProperty({type: String, description: 'city'})
    city : string
    // ----------------------------------------------------------------------------------- //
    @IsString({message: 'يجب ان يكون نوع الحقل نصي'})
    @IsEnum(MemberType, {message : 'يجب ان يكون نوع المستخدم طالب أو أستاذ'})
    @IsNotEmpty()
    @ApiProperty({type: String, enum: MemberType, default : MemberType.Student})
    memberType: MemberType;
    // ----------------------------------------------------------------------------------- //
    department: Department; 
}
