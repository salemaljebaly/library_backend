import { Members } from 'src/members/entities/members.entity';
import { Book } from 'src/books/entities/book.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookState, FileTypes, ReportType } from '../enums/barrowType';

@Entity()
export class Barrow extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;

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
  @Column()
  returnDate : string;
  // ----------------------------------------------------------------------------------- //
  @ManyToOne(() =>Members, (member:Members) => member.barrow)
  member : Members
  // ----------------------------------------------------------------------------------- //
  @ManyToOne(() =>Book, (book:Book) => book.barrow)
  book : Book
  // ----------------------------------------------------------------------------------- //
 
}
