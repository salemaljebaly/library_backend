import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Members } from 'src/members/entities/members.entity';
import { Not, Repository } from 'typeorm';
import { CreateBarrowDto } from './dto/create-barrow.dto';
import { UpdateReportDto } from './dto/update-barrow.dto';
import { Barrow } from './entities/barrow.entity';
import { BarrowState, FileTypes } from './enums/barrowType';

@Injectable()
export class BarrowService {
  relationTable = ['member', 'book'];
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Barrow)
    private barrowRepository: Repository<Barrow>,
    // --------------------------------------------- //
    @InjectRepository(Members)
    private memberRepository: Repository<Members>,
    // --------------------------------------------- //
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  // ----------------------------------------------------------------------------------- //
  async create( createReportDto: CreateBarrowDto,bookId : number, memberId :number ) {
    // createReportDto.barrower = citizen;
    const currentBook = this.bookRepository.findOne(
      {where:{id: bookId}}
    );
    
    const currentMember = this.memberRepository.findOne(
      {where:{id: memberId}}
    );
    delete (await currentMember).password;
    const barrow = this.barrowRepository.save({...createReportDto, member: await currentMember, book: await currentBook});
    return barrow;
  }
  // ----------------------------------------------------------------------------------- //
  // get all barrows with current user authorized
  findAll() {
    return this.barrowRepository.find(
      { relations:this.relationTable}
      );
  }
  // ----------------------------------------------------------------------------------- //
  // get all barrows with current user authorized 
  findByMember(currentMember : Members) {
    return  this.barrowRepository.find({ where: 
      {member:
        {id : currentMember.id},  state: Not(BarrowState.REJECTED)}
      , relations: this.relationTable
    });
  }
  // ----------------------------------------------------------------------------------- //
  // get all books by user id
  async findAcceptBarrow() {
    const barrow = await this.barrowRepository.find({
      where: {
        state: BarrowState.ACCEPTED,
      },
      relations: this.relationTable
    });
    return barrow;
  }
  // ----------------------------------------------------------------------------------- //
  // get barrow by user id
  findOne(id: number) {
    return this.barrowRepository.findOne({ where: {id : id}
      , relations: this.relationTable
    });
  }

  findOneBarrow(id: number){
    return this.barrowRepository.findOne({
      where : {id: id}
    });
  }
  
  // ----------------------------------------------------------------------------------- //
  // update barrow
  update(id: number, updateReportDto: UpdateReportDto) {
    return this.barrowRepository.update(id, updateReportDto);
  }
  // ----------------------------------------------------------------------------------- //
  // remove barrow by id
  remove(id: number) {
    this.barrowRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
  countAllBarrows(){
    return this.barrowRepository.count();
  }
  // ----------------------------------------------------------------------------------- //
}
