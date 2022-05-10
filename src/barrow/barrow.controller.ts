import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BarrowService } from './barrow.service';
import { CreateReportDto } from './dto/create-barrow.dto';
import { UpdateReportDto } from './dto/update-barrow.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileTypes } from './enums/barrowType';
import fs = require('fs');
import { AR } from 'src/locale/ar';
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
@ApiTags('Barrow')
@Controller('barrow')
// TODO fix manytomany crud operation
export class BookController {
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly barrowService: BarrowService) {}
  // ----------------------------------------------------------------------------------- //
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createReportDto: CreateReportDto, @Request() req) {
    // get the current citizen data
    const citizen = req.user;
    // barrowgetway.handleEvent('updated');
    return this.barrowService.create( createReportDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    // req.user
    return this.barrowService.findAll();
    // return "test"
  }
  // ----------------------------------------------------------------------------------- //
  @Get('count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  countAllReports() {
    // req.user
    return this.barrowService.countAllBarrows();
    // return "test"
  }
  // ----------------------------------------------------------------------------------- //
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.barrowService.findOne(+id);
  }
  // ----------------------------------------------------------------------------------- //
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.barrowService.update(+id, updateReportDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.barrowService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
}
