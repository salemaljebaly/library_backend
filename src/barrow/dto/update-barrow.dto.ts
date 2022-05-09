import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-barrow.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
