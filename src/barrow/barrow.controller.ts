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
} from '@nestjs/common';
import { BarrowService } from './barrow.service';
import { CreateReportDto as CreateBarrowDto } from './dto/create-barrow.dto';
import { UpdateReportDto as UpdateBarrowDto } from './dto/update-barrow.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
// ----------------------------------------------------------------------------------- //
@ApiTags('Barrow')
@Controller('barrow')
// TODO fix manytomany crud operation
export class BookController {
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly barrowService: BarrowService) {}
  // ----------------------------------------------------------------------------------- //
  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  create(@Body() createBarrowDto: CreateBarrowDto, @Request() req) {

    // barrowgetway.handleEvent('updated');
    return this.barrowService.create( createBarrowDto);
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
  update(@Param('id') id: string, @Body() updateBarrowDto: UpdateBarrowDto) {
    return this.barrowService.update(+id, updateBarrowDto);
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
