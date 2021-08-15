import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Field, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Product } from 'src/product/product.entity';
import { PostRevieDto } from './dto/post-review.dto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

const pubSub = new PubSub();

@Resolver((of) => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Subscription((returns) => Product, {
    name: 'reviewAdded',
    filter(this: ReviewResolver, payload, variables) {
      return payload.reviewAdded.id === variables.id
    },
  })
  reviewAdded(@Args('id') id: number) {
    return pubSub.asyncIterator('reviewAdded');
  }

  @UsePipes(new ValidationPipe())
  @Mutation((returns) => Product)
  async postReview(@Args('postReviewDto') dto: PostRevieDto) {
    const newReview = await this.reviewService.create(dto);
    pubSub.publish('reviewAdded', { reviewAdded: newReview });
    return newReview;
  }
}
