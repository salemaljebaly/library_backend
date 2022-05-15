import { Barrow } from 'src/barrow/entities/barrow.entity';
import { User } from 'src/users/entities/user.entity';
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
import { BookState, FileTypes, ReportType } from '../enums/bookType';

@Entity()
export class Book extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  bookName: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  bookPublishDate: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  returnDate: string;
  // ----------------------------------------------------------------------------------- //
  @Column({default: 'salem'})
  authorName: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  bookPages: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  bookPublisher: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  bookDescription: string;  
  // ----------------------------------------------------------------------------------- //
  @Column({ type: 'enum', enum: BookState, default: BookState.STAYED })
  state: string;
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
  // report attach
  @Column({ nullable: true })
  bookFilePath: string;
  // ----------------------------------------------------------------------------------- //
  // report file type
  @Column({ nullable: true })
  fileType: string;
  // ----------------------------------------------------------------------------------- //
  @OneToMany(() => Barrow, (barrow: Barrow) => barrow.member)
  barrow : Barrow[];
  // ----------------------------------------------------------------------------------- //
  @ManyToOne(() => User, (user: User) => user.book)
  user : User;
  // ----------------------------------------------------------------------------------- //
}
