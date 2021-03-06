import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-members.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { Response } from 'express';
import { AR } from 'src/locale/ar';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';
import { MemberLoginDto } from './dto/members-login.dto';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // ----------------------------------------------------------------------------------- //
  @Post('auth')
  @ApiCreatedResponse({description: AR.user_login})
  @ApiUnauthorizedResponse({description: AR.wrong_email_or_password})
  async login(@Body() membersLoginDto: MemberLoginDto) {
    return this.membersService.login(membersLoginDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createMemberDto: CreateMemberDto, @Param('id') id: number, @Request() req) {
    return this.membersService.create(createMemberDto, id, req.user);
  }
  // ----------------------------------------------------------------------------------- //
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.membersService.findAll();
  }
  // ----------------------------------------------------------------------------------- //
  @Get('count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  countAllCitizen() {
    return this.membersService.countAllMember();
  }
  // ----------------------------------------------------------------------------------- //
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: number) {
    const citizen = this.membersService.findOne(id);
    return citizen;
    // if(Object.keys(citizen).length > 0){return citizen} else {return {message : AR.no_citizen_found}}
  }
  // ----------------------------------------------------------------------------------- //
  @Patch(':id/:depId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string,@Param('depId') depId: string, @Body() updateMemberDto: UpdateMembersDto, @Request() req) {
    return this.membersService.update(+id,+depId, updateMemberDto, req.user);
  }
  // ----------------------------------------------------------------------------------- //
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
}
