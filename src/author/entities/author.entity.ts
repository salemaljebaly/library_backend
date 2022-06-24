import { Book } from 'src/books/entities/book.entity';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn , OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';

@Entity()
export class Author extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  full_name: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  // ----------------------------------------------------------------------------------- //
  @Column()
  @UpdateDateColumn()
  updateAt: Date;
  // ----------------------------------------------------------------------------------- //
  @ManyToOne(() => Book, (book: Book) => book.author)
  book : Book; 
}
