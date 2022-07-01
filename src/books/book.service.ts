import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Members } from 'src/members/entities/members.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookDto as CreateBookDto } from './dto/create-book.dto';
import { UpdateReportDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { BookState } from './enums/bookType';

@Injectable()
export class BookService {4
  relationColumn : string = 'author';
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}
  // ----------------------------------------------------------------------------------- //
  async create( createBookDto: CreateBookDto,authorId : number, user: User) { 
    const author = this.authorRepository.findOne(
      {where:{id: authorId}}
    );
    const book = this.bookRepository.create({...createBookDto,author: await author});
    await book.save();

    return book;
  }
  // ----------------------------------------------------------------------------------- //
  // get all books with current user authorized
  findAll() {
    return this.bookRepository.find(
      { relations: ['barrow', this.relationColumn] }
      );
  }
  // ----------------------------------------------------------------------------------- //
  // get book by user id
  findOne(id: number) {
    return this.bookRepository.findOne({ where: {id : id},
      relations: [this.relationColumn] 
    });
  }
  // ----------------------------------------------------------------------------------- //
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
  // get all books by user id
  async findBookStayed() {
    const books = await this.bookRepository.find({
      where: {
        state: 'Stayed',
      },
      relations: [this.relationColumn] 
    });
    return books;
  }
  // ----------------------------------------------------------------------------------- //
  // update book
  async update(id: number, authorId: number,updateReportDto: UpdateReportDto) {
    const author = this.authorRepository.findOne(
      {where:{id: authorId}}
    );
    return  this.bookRepository.update(id, {...updateReportDto,author : await author});
  }
  // ----------------------------------------------------------------------------------- //
  // update book
  async updateOne(id: number,updateReportDto: UpdateReportDto) {
    return  this.bookRepository.update(id, {...updateReportDto});
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
