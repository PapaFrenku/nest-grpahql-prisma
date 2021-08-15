import {
  UsePipes,
  ValidationPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Product } from '../product/product.entity';
import { ProductService } from 'src/product/product.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopLevelCategory, TopPageEntity } from './top-page.entity';
import { TopPageService } from './top-page.service';

@Resolver((of) => TopPageEntity)
export class TopPageResolver {
  constructor(
    private readonly topPageService: TopPageService,
    private readonly productService: ProductService,
  ) {}

  @Mutation((returns) => TopPageEntity)
  @UsePipes(new ValidationPipe())
  @UseGuards(GqlAuthGuard)
  async createTopPage(@Args('createTopPageDto') topPageDto: CreateTopPageDto) {
    return this.topPageService.create(topPageDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => TopPageEntity)
  async deleteTopPage(@Args('id') id: number) {
    const detetedPage = await this.topPageService.deleteById(id);
    if (!detetedPage) {
      throw new NotFoundException();
    }
    return detetedPage
  }

  @UseGuards(GqlAuthGuard)
  @UsePipes(new ValidationPipe())
  @Mutation((returns) => TopPageEntity)
  async updateTopPage(
    @Args('id') id: number,
    @Args('createTopPageDto') dto: CreateTopPageDto,
  ) {
    const updatedPage = await this.topPageService.updateById(id, dto);
    if (!updatedPage) {
      throw new NotFoundException();
    }
    return updatedPage;
  }

  @Query((returns) => [TopPageEntity])
  async getAllTopPages() {
    return this.topPageService.findAll();
  }


  @Query((returns) => TopPageEntity)
  async getTopPageByAlias(@Args('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias);
    if (!page) {
      throw new NotFoundException();
    }
    return page;
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => TopPageEntity)
  async getTopPage(@Args('id') id: number) {
    const page = await this.topPageService.findById(id);
    if (!page) {
      throw new NotFoundException();
    }
    return page;
  }

  @UsePipes(new ValidationPipe())
  @Query(returns => [TopPageEntity])
  async findByCategory(@Args('findTopPageDto') dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }

  @Query(returns => [TopPageEntity])
  async findByText(@Args('searchQuery') searchQuery: string) {
    return this.topPageService.findByText(searchQuery)
  }

  @ResolveField((returns) => [Product])
  async products(@Parent() topPage: TopPageEntity) {
    const { category } = topPage;
    return this.productService.findBySecondCategory(category);
  }
}
