import {Module} from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import {Product} from 'src/product/product.entity';
import {ProductService} from 'src/product/product.service';
import {ReviewResolver} from './review.resolver';
import {ReviewService} from './review.service';

@Module({
  imports: [PrismaModule],
  providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
