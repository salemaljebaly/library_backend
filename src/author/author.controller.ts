import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';
import { AuthorService } from './Author.service';
import { CreateAuthorDto } from './dto/create-Author.dto';
import { UpdateAuthorDto } from './dto/update-Author.dto';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly authorService: AuthorService) {}
  // ----------------------------------------------------------------------------------- //
  @Post() 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.authorService.findAll();
  }
  // ----------------------------------------------------------------------------------- //
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }
  // ----------------------------------------------------------------------------------- //
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
}
