import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-book.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
