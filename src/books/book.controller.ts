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
import { BookService } from './book.service';
import { CreateBookDto as CreateBookDto } from './dto/create-book.dto';
import { UpdateReportDto } from './dto/update-book.dto';
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
import { FileTypes } from './enums/bookType';
import fs = require('fs');
import { AR } from 'src/locale/ar';
// ----------------------------------------------------------------------------------- //
export const storage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      let fileType: string;
      fileType = path.parse(file.originalname).ext.slice(1).trim();
      
      // check if file type exists in file type
      for (const type in FileTypes) {
        // check if type in enum
        if (FileTypes[type] == fileType) {
          console.log(fileType);
          // check if the dir name is exists
          if (!fs.existsSync('./uploads/files/' + fileType)) {
            fs.mkdirSync('./uploads/files/' + fileType, { recursive: true });
          }
        } else {
          console.log('false you cant add' + FileTypes[type]);
        }
      }
      cb(null, './uploads/files/' + fileType + '/');
    },
    filename: (req, file, cb) => {
      const filename: string =
        new Date().toISOString().slice(0, 10) + '_' + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
// ----------------------------------------------------------------------------------- //
@ApiTags('Books')
@Controller('book')
export class BookController {
  public static fileType = FileTypes.PNG;
  // ----------------------------------------------------------------------------------- //
  constructor(private readonly bookService: BookService) {}
  // ----------------------------------------------------------------------------------- //
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: AR.book_created })
  create(@Body() createBookDto: CreateBookDto, @Request() req) {
    // bookgetway.handleEvent('updated');
    return this.bookService.create(createBookDto, req.user);
  }
  // ----------------------------------------------------------------------------------- //
  @Get('bookByName')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getByUser(@Request() req) {
    return this.bookService.findByBookName(req.book.bookName);
  }
  // ----------------------------------------------------------------------------------- //
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    // req.user
    return this.bookService.findAll();
    // return "test"
  }
  // ----------------------------------------------------------------------------------- //
  @Get('count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  countAllReports() {
    // req.user
    return this.bookService.countAllBooks();
    // return "test"
  }
  // ----------------------------------------------------------------------------------- //
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
  // ----------------------------------------------------------------------------------- //
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.bookService.update(+id, updateReportDto);
  }
  // ----------------------------------------------------------------------------------- //
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
  // ----------------------------------------------------------------------------------- //
  // upload
  // upload single file
  //TODO fix param id in post swagger, test on postman
  @Post('upload/:bookId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFile(@Param('bookId') bookId : number, @UploadedFile() file) {
    const currentBook = await this.bookService.findOneBook(1);
    // delete old file from files
    if (currentBook.bookFilePath != null) {
      fs.unlink(
        `./uploads/files/${currentBook.fileType}/${currentBook.bookFilePath}`,
        function (err) {
          if (err) return console.log(err);
          console.log('file deleted successfully');
        },
      );
    }
    // upload new file
    const extension: string = path.parse(file.originalname).ext.slice(1);
    this.bookService.uploadFile(bookId, extension, file.filename);
    return { imagePath: file.path };
  }
  // ----------------------------------------------------------------------------------- //
  // read images
  @Get('upload/view/:bookId')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiParam({ name: 'bookId' })
  async seeUploadedFile(@Param('bookId') id, @Res() res): Promise<any> {
    const currentBook = await this.bookService.findOneBook(id);
    return res.sendFile(
      join(
        process.cwd(),
        `./uploads/files/${currentBook.fileType}/${currentBook.bookFilePath}`,
      ),
    );
  }
  // ----------------------------------------------------------------------------------- //
}
