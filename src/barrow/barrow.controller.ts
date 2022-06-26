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
import { CreateBarrowDto } from './dto/create-barrow.dto';
import { UpdateReportDto as UpdateBarrowDto } from './dto/update-barrow.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';
import {
  ApiBearerAuth,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
// ----------------------------------------------------------------------------------- //
@ApiTags('Barrow')
@Controller('barrow')
// TODO fix manytomany crud operation
export class BarrowController {
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly barrowService: BarrowService) {}
  // ----------------------------------------------------------------------------------- //
  @Get('bymember')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findBarrowsByMember(@Request() req) {
    // return this.barrowService.findAll();
    return this.barrowService.findByMember(req.user);
    // return "test"
  }
  // ----------------------------------------------------------------------------------- //
  @Post(":bookId/:memberId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  // @ApiParam({
  //   name: 'bookId',
  // })
  
  // @ApiParam({
  //   name: 'memberId',
  // })
  create(@Body() createBarrowDto: CreateBarrowDto, @Param('bookId') bookId : number, @Param('memberId') memberId : number) {
    console.log(bookId);
    return this.barrowService.create( createBarrowDto, bookId, memberId);
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
