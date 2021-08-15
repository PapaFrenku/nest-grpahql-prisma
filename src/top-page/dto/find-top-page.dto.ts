import {Type} from 'class-transformer';
import {IsEnum} from 'class-validator';
import {HhData, TopLevelCategory} from '../top-page.entity';
import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class FindTopPageDto {
    @IsEnum(TopLevelCategory)
    @Field((type) => TopLevelCategory)
    firstCategory: TopLevelCategory;
}
