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


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    MembersModule, 
    DepartmentModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
