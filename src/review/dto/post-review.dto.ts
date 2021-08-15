import {Field, InputType, Int} from '@nestjs/graphql';
import {IsNumber, IsString, Max, Min} from 'class-validator';

@InputType()
export class PostRevieDto {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    name: string;

    @Field()
    @IsString()
    description: string;

    @Max(5)
    @Min(1)
    @Field(type => Int)
    rating: number;

    @Field()
    @IsNumber()
    productId: number
}
