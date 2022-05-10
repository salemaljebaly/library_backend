import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Members } from 'src/members/entities/members.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-barrow.dto';
import { UpdateReportDto } from './dto/update-barrow.dto';
import { Barrow } from './entities/barrow.entity';
import { FileTypes } from './enums/barrowType';

@Injectable()
export class BarrowService {
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
  async create( createReportDto: CreateReportDto) {
    // createReportDto.barrower = citizen;
    const currentBook = this.bookRepository.findOne(
      {where:{id: 1}}
    );
    
    const currentMember = this.memberRepository.findOne(
      {where:{id: 1}}
    );
    delete (await currentMember).password;
    const barrow = this.barrowRepository.save({...createReportDto, member: await currentMember, book: await currentBook});
    return barrow;
  }
  // ----------------------------------------------------------------------------------- //
  // get all barrows with current user authorized
  findAll() {
    return this.barrowRepository.find(
      { relations: ['barrow'] }
      );
  }
  // ----------------------------------------------------------------------------------- //
  // get barrow by user id
  findOne(id: number) {
    return this.barrowRepository.findOne({ where: {id : id}
      , relations: ['barrow'] 
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
