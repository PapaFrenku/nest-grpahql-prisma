import {Field, Int, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Max, Min} from 'class-validator';
import { Product } from 'src/product/product.entity';

export enum TopLevelCategory {
  Courses = 'Courses',
  Services = 'Services',
  Books = 'Books',
}

registerEnumType(TopLevelCategory, {
  name: 'TopLevelCategory',
});

@ObjectType()
export class HhData {
  @Field((type) => Int)
  count: number;

  @Field((type) => Int)
  juniorSalary: number;

  @Field((type) => Int)
  middleSalary: number;

  @Field((type) => Int)
  seniorSalary: number;

  @Field((type) => Date)
  updatedAt: Date;
}

@ObjectType()
export class TopPageAdvantage {
  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class TopPageEntity {
  @Field((type) => Int)
  id: number;

  @Field((type) => TopLevelCategory)
  firstCategory: TopLevelCategory;

  @Field((type) => String)
  secondCategory?: string;

  @Field((type) => String)
  alias: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  metaTitle: string;

  @Field((type) => String)
  metaDescription: string;

  @Field((type) => String)
  category: string;

  @Field((type) => HhData)
  hh?: HhData;

  @Field((type) => [TopPageAdvantage])
  advantages?: TopPageAdvantage[];

  @Field((type) => String)
  seoText?: string;

  @Field((type) => String)
  tagsTitle: string;

  @Field((type) => [String])
  tags: string[];

  @Field(type => [Product])
  products: Product[];
  
  @Field(type => Date)
  createdAt: Date
}
