import {Field, InputType} from '@nestjs/graphql';
import {IsNumber, IsString} from 'class-validator';

@InputType()
export class FindProductDto {
  @IsString()
  @Field()
  category: string;

  @Field()
  @IsNumber()
  limit: number;
}
