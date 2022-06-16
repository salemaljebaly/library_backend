import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/enum/role.enum';
import { Department } from 'src/department/entities/department.entity';
import { Book } from 'src/books/entities/book.entity';
import { Members } from 'src/members/entities/members.entity';

@Entity()
export class User extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  fullName: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ unique: true })
  username: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ unique: true })
  email: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  password: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ default: true })
  isActive: boolean;
  // ----------------------------------------------------------------------------------- //
  // the date created
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  // ----------------------------------------------------------------------------------- //
  // created when update record
  @Column()
  @UpdateDateColumn()
  updateAt: Date;
  // ----------------------------------------------------------------------------------- //
  // encrypt the password before inserted in database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
  // ----------------------------------------------------------------------------------- //
  // check the password entered is correct
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  // ----------------------------------------------------------------------------------- //
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role
  // ----------------------------------------------------------------------------------- //
  @OneToMany(() => Department, (department : Department) => department.user)
  department : Department[]
  // ----------------------------------------------------------------------------------- //
  // @OneToMany(() => Book, (book : Book) => book.user)
  // book : Book[]
  // ----------------------------------------------------------------------------------- //
  @OneToMany(() => Members, (member : Members) => member.user)
  member : Members[]
  // ----------------------------------------------------------------------------------- //
}
