import { PartialType } from '@nestjs/swagger';
import { CreateBarrowDto } from './create-barrow.dto';

export class UpdateReportDto extends PartialType(CreateBarrowDto) {}
