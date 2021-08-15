import {Field, InputType} from '@nestjs/graphql';
import {IsNumber, IsOptional} from 'class-validator';

@InputType()
export class FindAllProductDto {
  @IsNumber()
  @Field({nullable: true})
  @IsOptional()
  skip?: number;

  @Field({nullable: true})
  @IsNumber()
  @IsOptional()
  take?: number;
}
