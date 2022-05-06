import { Members } from 'src/members/entities/members.entity';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn , OneToMany} from 'typeorm';

@Entity()
export class Department extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column({nullable: true})
  dep_code: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  dep_name: string;
  // ----------------------------------------------------------------------------------- //
  @OneToMany(() => Members, (member: Members) => member.department)
  member : Members[]; 
}
