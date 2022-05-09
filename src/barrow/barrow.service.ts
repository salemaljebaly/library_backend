import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}
  // ----------------------------------------------------------------------------------- //
  async create( createReportDto: CreateReportDto) {
    // createReportDto.barrower = citizen;
    const barrow = this.barrowRepository.create(createReportDto);
    await barrow.save();

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
