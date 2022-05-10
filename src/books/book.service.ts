import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/members/entities/members.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-book.dto';
import { UpdateReportDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { FileTypes } from './enums/bookType';

@Injectable()
export class BookService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  // ----------------------------------------------------------------------------------- //
  async create( createReportDto: CreateReportDto) {
    // createReportDto.booker = citizen;
    const book = this.bookRepository.create(createReportDto);
    await book.save();

    return book;
  }
  // ----------------------------------------------------------------------------------- //
  // get all books with current user authorized
  findAll() {
    return this.bookRepository.find(
      { relations: ['barrow'] }
      );
  }
  // ----------------------------------------------------------------------------------- //
  // get book by user id
  findOne(id: number) {
    return this.bookRepository.findOne({ where: {id : id}
      , relations: ['barrow'] 
    });
  }

  findOneBook(id: number){
    return this.bookRepository.findOne({
      where : {id: id}
    });
  }
  // ----------------------------------------------------------------------------------- //
  // get all books by user id
  async findByBookName(bookName: string) {
    const books = await this.bookRepository.find({
      where: {
        bookName: bookName,
      },
      relations: ['barrow']
    });
    return books;
  }
  // ----------------------------------------------------------------------------------- //
  // update book
  update(id: number, updateReportDto: UpdateReportDto) {
    return this.bookRepository.update(id, updateReportDto);
  }
  // ----------------------------------------------------------------------------------- //
  async uploadFile(id: number, filetype: string, bookFilePath : string) {
    const currentBook  = await this.findOneBook(id)
    currentBook.fileType = filetype;
    currentBook.bookFilePath = bookFilePath;
    return this.bookRepository.save(currentBook)
  }
  // ----------------------------------------------------------------------------------- //
  // remove book by id
  remove(id: number) {
    this.bookRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
  countAllBooks(){
    return this.bookRepository.count();
  }
  // ----------------------------------------------------------------------------------- //
}
