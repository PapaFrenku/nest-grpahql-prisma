import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Max, Min} from 'class-validator';
import {Product} from 'src/product/product.entity';

@ObjectType()
export class Review {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Max(5)
  @Min(1)
  @Field((type) => Int)
  rating: number;

  @Field()
  productId: string;

  @Field(type => Product)
  product: Product;

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}
