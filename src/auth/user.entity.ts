import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class AccesToken {
    @Field()
    // eslint-disable-next-line camelcase
    access_token: string;
}

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
