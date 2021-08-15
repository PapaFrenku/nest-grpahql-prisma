import {
  NotFoundException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { Product, TopLevelCategory } from '@prisma/client';
import { PubSub } from 'apollo-server-express';
import {GqlAuthGuard} from 'src/auth/guards/gql-auth.guard';
import {JwtAuthGuard} from 'src/auth/guards/jwt.guard';
import { Review } from 'src/review/review.entity';
import {CreateProductDto} from './dto/create-product.dto';
import { FindAllProductDto } from './dto/find-all-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Product as ProductEntity} from './product.entity';
import {ProductService} from './product.service';

const PRODUCT_NOT_FOUND_ERROR = 'Product not found';

@Resolver((of) => ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation((returns) => ProductEntity)
  @UsePipes(new ValidationPipe())
  @UseGuards(GqlAuthGuard)
  async createProduct(
    @Args('createProductDto') productDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(productDto);
  }

  @Mutation((returns) => ProductEntity)
  @UsePipes(new ValidationPipe())
  @UseGuards(GqlAuthGuard)
  async deleteProduct(
    @Args('id') id: number,
  ){
    const res = await this.productService.delete(id);

    if (!res) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return res
  }

  @ResolveField()
  async reviewAvg(@Parent() product: Product) {
    const { id } = product;
    const res = await this.productService.getReviewAvg(id);
    
    return res._avg.rating || 0;
  }


  @Mutation((returns) => ProductEntity)
  @UsePipes(new ValidationPipe())
  @UseGuards(GqlAuthGuard)
  async updateProduct(
    @Args('id') id: number,
    @Args('updateProductDto') dto: UpdateProductDto
  ){
    const res = await this.productService.update(id, dto);

    if (!res) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return res;
  }

  @Query((returns) => ProductEntity)
  async product(@Args('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Query((returns) => [ProductEntity])
  async products(@Args("findAllProductDto") dto: FindAllProductDto): Promise<Product[]> {
    const res = await this.productService.findAll(dto);
    return res;
  }

  @Query((returns) => [ProductEntity])
  async findProductsByText(@Args('query') query: string): Promise<Product[]> {
    const res = await this.productService.findByText(query);
    return res;
  }
}
