import { PartialType } from '@nestjs/swagger';
import {  CreateMemberDto} from './create-members.dto';

export class UpdateMembersDto extends PartialType(CreateMemberDto) {}
