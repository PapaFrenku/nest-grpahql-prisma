import {Type} from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {HhData, TopLevelCategory, TopPageAdvantage} from '../top-page.entity';
import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class HhDataDto {
  @Field(type => Int)
  @IsNumber()
  count: number;

  @Field(type => Int)
  @IsNumber()
  juniorSalary: number;

  @Field(type => Int)
  @IsNumber()
  middleSalary: number;

  @Field(type => Int)
  @IsNumber()
  seniorSalary: number;
}

@InputType()
export class TopPageAdvantageDto {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  description: string;
}

@InputType()
export class CreateTopPageDto {
  @Field((type) => TopLevelCategory)
  @IsString()
  firstCategory: TopLevelCategory;

  @Field((type) => String)
  @IsString()
  secondCategory: string;

  @Field((type) => String)
  @IsString()
  alias: string;

 @Field((type) => String)
  @IsString()
  title: string;

  @Field((type) => String)
  @IsString()
  metaTitle: string;

  @Field((type) => String)
  @IsString()
  metaDescription: string;

  @Field((type) => String)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  @Field((type) => HhDataDto, {nullable: true})
  hh?: HhDataDto;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  @Field((type) => [TopPageAdvantageDto])
  advantages?: TopPageAdvantageDto[];

  @IsString()
  @IsOptional()
  @Field((type) => String)
  seoText?: string;

  @Field((type) => String)
  @IsString()
  tagsTitle: string;

  @Field((type) => [String])
  @IsArray()
  @IsString({each: true})
  tags: string[];
}
