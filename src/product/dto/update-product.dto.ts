import {InputType, Field, Int} from '@nestjs/graphql';
import {Max, Min, MinLength, MaxLength, IsOptional} from 'class-validator';
import { ProductCharacteristicDto } from './create-product.dto';

@InputType()
export class UpdateProductDto {
  @IsOptional()
  @Field({nullable: true})
  image?: string;

  @MinLength(1)
  @MaxLength(100)
  @Field({nullable: true})
  @IsOptional()
  title: string;

  @IsOptional()
  @Field({nullable: true})
  link?: string;

  @Max(5)
  @Min(1)
  @IsOptional()
  @Field((type) => Int, {nullable: true})
  initialRating: number;

  @IsOptional()
  @Field((type) => Int, {nullable: true})
  price: number;

  @IsOptional()
  @Field((type) => Int, {nullable: true})
  oldPrice?: number;

  @IsOptional()
  @Field((type) => Int, {nullable: true})
  credit: number;

  @IsOptional()
  @Field({nullable: true})
  description?: string;

  @IsOptional()
  @Field((type) => [String], {nullable: 'itemsAndList'})
  advantages?: string[];

  @IsOptional()
  @Field((type) => [String], {nullable: 'itemsAndList'})
  disAdvantages?: string[];

  @IsOptional()
  @Field((type) => [String], {nullable: 'itemsAndList'})
  categories: string[];

  @IsOptional()
  @Field((type) => [String], {nullable: 'itemsAndList'})
  tags: string[];

  @IsOptional()
  @Field((type) => [ProductCharacteristicDto], {nullable: 'itemsAndList'})
  characteristics: ProductCharacteristicDto[];
}
