import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Review } from 'src/review/review.entity';
import { Max, Min } from 'class-validator';

@ObjectType()
export class FileEntity {
    @Field((type) => String)
    filename: string;
}