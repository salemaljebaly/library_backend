import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { DepartmentModule } from './department/department.module';
import { BookModule } from './books/book.module';
import { BarrowModule } from './barrow/barrow.module';
import { AuthorModule } from './author/author.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    MembersModule, 
    DepartmentModule,
    BookModule,
    BarrowModule,
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
