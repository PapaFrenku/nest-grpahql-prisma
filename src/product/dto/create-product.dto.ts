import {InputType, Field, Int} from '@nestjs/graphql';
import {Max, Min, MinLength, MaxLength, IsOptional, IsString} from 'class-validator';
import { TopLevelCategory } from 'src/top-page/top-page.entity';

@InputType()
export class ProductCharacteristicDto {
  @Field()
  name: string;

  @Field()
  value: string;
}

@InputType()
export class CreateProductDto {
  @IsOptional()
  @Field({nullable: true})
  image?: string;

  @MinLength(1)
  @MaxLength(100)
  @Field()
  title: string;

  @Field({nullable: true})
  link?: string;

  @Max(5)
  @Min(1)
  @Field((type) => Int)
  initialRating: number;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int, {nullable: true})
  oldPrice?: number;

  @Field((type) => Int)
  credit: number;

  @Field({nullable: true})
  description?: string;

  @Field((type) => [String], {nullable: 'itemsAndList'})
  advantages?: string[];

  @Field((type) => [String], {nullable: 'itemsAndList'})
  disAdvantages?: string[];

  @Field((type) => [String], {nullable: 'items'})
  categories: string[];

  @Field((type) => TopLevelCategory)
  @IsString()
  firstCategory: TopLevelCategory;

  @Field((type) => [String], {nullable: 'items'})
  tags: string[];

  @Field((type) => [ProductCharacteristicDto], {nullable: 'itemsAndList'})
  characteristics: ProductCharacteristicDto[];
}
