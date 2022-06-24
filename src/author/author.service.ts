import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}
  // ----------------------------------------------------------------------------------- //

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepository.create(createAuthorDto).save();
  }
  // ----------------------------------------------------------------------------------- //

  findAll() {
    return this.authorRepository.find();
  }
  // ----------------------------------------------------------------------------------- //

  findOne(id: number) {
    return this.authorRepository.findOne({
      where : {id: id}
    });
  }
  // ----------------------------------------------------------------------------------- //

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto);
  }
  // ----------------------------------------------------------------------------------- //

  remove(id: number) {
    this.authorRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
}
