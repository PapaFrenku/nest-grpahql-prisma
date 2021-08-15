import {Module} from '@nestjs/common';
import {TopPageEntity} from './top-page.entity';
import {TopPageService} from './top-page.service';
import {TopPageResolver} from './top-page.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [PrismaModule, ProductModule],
  providers: [TopPageService, TopPageResolver],
})
export class TopPageModule {
}
