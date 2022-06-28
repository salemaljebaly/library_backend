import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberLoginDto } from './dto/members-login.dto';
import { CreateMemberDto } from './dto/create-members.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { Members } from './entities/members.entity';
import * as bcrypt from 'bcryptjs';

import { CreateDepartmentDto } from 'src/department/dto/create-department.dto';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MembersService {
  relationColumn : string = 'department';
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Members)
    private memberRepository: Repository<Members>,
    private jwtService: JwtService,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}
  // ----------------------------------------------------------------------------------- //
  //TODO fix duplicate member
  async create(createMembernDto: CreateMemberDto,depId : number, user : User) {
    // find department by id
    const dep = this.departmentRepository.findOne(
      {where:{id: depId}}
    );
    // check if admin is created member or not
    user.role != null ? createMembernDto.user = user : null
    const member = this.memberRepository.create({...createMembernDto, department : await dep});
    if(await this.findByUserName(createMembernDto.username) == undefined){
      await (await member).save();
    }
    // use delete to hide password from response
    delete (await member).password;
    return member;
  }
  // ----------------------------------------------------------------------------------- //
  async findAll(): Promise<Members[]> {
    const member = await this.memberRepository.find({ relations: [this.relationColumn] });
    // remove password from response
    member.map((user) => {
      delete user.password;
    });
    return member;
  }
  // ----------------------------------------------------------------------------------- //
  async findOne(id: number) {
    const member = await this.memberRepository.findOne(
      {where:{id: id},  relations: [this.relationColumn] }
    );
    if (member?.password) {
      // use delete to hide password fro m response
      delete member.password;
    }

    return member;
  }
  // ----------------------------------------------------------------------------------- //
  async update(id: number,depId : number, updateMembernDto: UpdateMembersDto, user : User) {
    const dep = this.departmentRepository.findOne(
      {where:{id: depId}}
    );
    // check if admin is created member or not
    user.role != null ? updateMembernDto.user = user : null
    return await this.memberRepository.update(id,{
      ...updateMembernDto,
      password : await bcrypt.hash(updateMembernDto.password, 8),
      department : await dep
    });
  }
  // ----------------------------------------------------------------------------------- //
  async remove(id: number) {
    await this.memberRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
  async findByUserName(username: string) {
    return  await this.memberRepository.findOne(
      {where:{username: username},  relations: [this.relationColumn] }
    );
  }
  // ----------------------------------------------------------------------------------- //
  async login(memberLoginDto: MemberLoginDto) {
    
    const member = await this.validateUser(memberLoginDto);

    // properties  that want to save in jwt
    const payload = {
      id: member.id,
      fullName: member.fullName,
      username: member.username,
      email: member.email,
      phone: member.phone,
      isActive: member.isActive,
      city: member.city      
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
    
  }
  // ----------------------------------------------------------------------------------- //
  // check if user is exist then check compare password to check if user data is correct
  async validateUser(memberLoginDto: MemberLoginDto): Promise<Members> {
    const { username, password } = memberLoginDto;

    const member = await this.findByUserName(username);
    if (!(await member?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    
    return member;
  }
  // ----------------------------------------------------------------------------------- //
  countAllMember() {
    return this.memberRepository.count();
  }

}
