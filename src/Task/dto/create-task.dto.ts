import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  description?: string;

  @IsString()
  @IsIn(['Not Started', 'In-Progress', 'Completed'])
  @IsOptional()
  status?: string;
}
