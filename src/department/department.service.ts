import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  // ----------------------------------------------------------------------------------- //
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}
  // ----------------------------------------------------------------------------------- //

  async create(createDepartmentDto: CreateDepartmentDto, user: User) {
    createDepartmentDto.user = user;
    return await this.departmentRepository.create(createDepartmentDto).save();
  }
  // ----------------------------------------------------------------------------------- //

  findAll() {
    return this.departmentRepository.find();
  }
  // ----------------------------------------------------------------------------------- //

  findOne(id: number) {
    return this.departmentRepository.findOne({
      where : {id: id}
    });
  }
  // ----------------------------------------------------------------------------------- //

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(id, updateDepartmentDto);
  }
  // ----------------------------------------------------------------------------------- //

  remove(id: number) {
    this.departmentRepository.delete(id);
    return id;
  }
  // ----------------------------------------------------------------------------------- //
}
