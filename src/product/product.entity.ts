import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Review } from 'src/review/review.entity';
import { Max, Min } from 'class-validator';
import { TopLevelCategory } from 'src/top-page/top-page.entity';

@ObjectType()
export class Product {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  image?: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  link?: string;

  @Max(5)
  @Min(1)
  @Field((type) => Int)
  initialRating: number;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int, { nullable: true })
  oldPrice?: number;

  @Field((type) => Int)
  credit: number;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [String], { nullable: 'items' })
  advantages?: string[];

  @Field((type) => [String], { nullable: 'items' })
  disAdvantages?: string[];

  @Field((type) => [String], { nullable: 'items' })
  categories: string[];

  @Field((type) => [String], { nullable: 'items' })
  tags: string[];

  @Field((type) => [ProductCharacteristic], { nullable: 'itemsAndList' })
  characteristics?: ProductCharacteristic[];

  @Field((type) => [Review])
  reviews: Review[];

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Float)
  reviewAvg: number;

  @Field((type) => TopLevelCategory)
  firstCategory: TopLevelCategory;
}

@ObjectType()
class ProductCharacteristic {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  value: string;

  @Field((type) => Product)
  product: Product;

  @Field((type) => Int)
  productId: number;
}
