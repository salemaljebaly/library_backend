import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberLoginDto } from './dto/members-login.dto';
import { CreateMemberDto } from './dto/create-members.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { Members } from './entities/members.entity';

@Injectable()
export class MembersService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Members)
    private memberRepository: Repository<Members>,
    private jwtService: JwtService,
  ) {}
  // ----------------------------------------------------------------------------------- //
  //TODO fix duplicate member
  async create(createMembernDto: CreateMemberDto) {
    const member = this.memberRepository.create(createMembernDto);
    if(await this.findByUserName(createMembernDto.username) == undefined){
      await member.save();
    }
    // use delete to hide password from response
    delete member.password;
    return member;
  }
  // ----------------------------------------------------------------------------------- //
  async findAll(): Promise<Members[]> {
    const member = await this.memberRepository.find();
    // remove password from response
    member.map((user) => {
      delete user.password;
    });
    return member;
  }
  // ----------------------------------------------------------------------------------- //
  async findOne(id: number) {
    const citizen = await this.memberRepository.findOne(
      {where:{id: id}}
    );
    if (citizen?.password) {
      // use delete to hide password fro m response
      delete citizen.password;
    }

    return citizen;
  }
  // ----------------------------------------------------------------------------------- //
  async update(id: number, updateMembernDto: UpdateMembersDto) {
    return await this.memberRepository.update(id, updateMembernDto);
  }
  // ----------------------------------------------------------------------------------- //
  async remove(id: number) {
    await this.memberRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
  async findByUserName(username: string) {
    return await this.memberRepository.findOne({
      where: {
        username: username,
      },
    });
  }
  // ----------------------------------------------------------------------------------- //
  async login(citizenLoginDto: MemberLoginDto) {
    
    const citizen = await this.validateUser(citizenLoginDto);

    // properties  that want to save in jwt
    const payload = {
      id: citizen.id,
      firstName: citizen.fullName,
      username: citizen.username,
      email: citizen.email,
      phone: citizen.phone,
      isActive: citizen.isActive,
      city: citizen.city      
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
    
  }
  // ----------------------------------------------------------------------------------- //
  // check if user is exist then check compare password to check if user data is correct
  async validateUser(citizenLoginDto: MemberLoginDto): Promise<Members> {
    const { username, password } = citizenLoginDto;

    const citizen = await this.findByUserName(username);
    if (!(await citizen?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    
    return citizen;
  }
  // ----------------------------------------------------------------------------------- //
  countAllMember() {
    return this.memberRepository.count();
  }

}
