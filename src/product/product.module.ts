import {Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {ProductResolver} from './product.resolver';
import {Product} from './product.entity';
import {Review} from 'src/review/review.entity';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProductService, ProductResolver],
  exports: [ProductService]
})
export class ProductModule {}
