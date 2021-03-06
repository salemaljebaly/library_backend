import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Long,ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { MemberType } from "../enum/memberType.enum";
import { Department } from "src/department/entities/department.entity";
import { CreateDepartmentDto } from "src/department/dto/create-department.dto";
import { Barrow } from "src/barrow/entities/barrow.entity";
import { userInfo } from "os";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Members extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    fullName : string;
  
    @Column()
    username: string;
  
    @Column()
    email : string

    @Column()
    phone : string
    
    @Column()
    password: string;
  
    @Column()
    isActive: boolean;

    // the date created
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    // created when update record
    @Column({select : false})
    @UpdateDateColumn({select : false})
    updateAt: Date;

    // encrypt the password before inserted in database
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        console.log(this.password)
        this.password = await bcrypt.hash(this.password, 8);
    }

    
    // check the password entered is correct
    async validatePassword(password: string) : Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }

    
    @Column()
    city : string
    // ----------------------------------------------------------------------------------- //
    @Column({
        type: 'enum',
        enum: MemberType,
        default: MemberType.Student
    })
    memberType: MemberType
    // ----------------------------------------------------------------------------------- //
    // OneToMany relation ship between department and 
    @ManyToOne(() => Department, (department: Department) => department.member,{
        onDelete: 'CASCADE'
    })
    department: Department; 

    // ----------------------------------------------------------------------------------- //
    @OneToMany(() => Barrow, (barrow: Barrow) => barrow.member)
    barrow : Barrow[];
    // ----------------------------------------------------------------------------------- //
    // OneToMany relationship between user  and member
    @ManyToOne(() => User, (user: User) => user.member)
    user: User; 

}
