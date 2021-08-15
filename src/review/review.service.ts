import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostRevieDto } from './dto/post-review.dto';
import {omit} from 'lodash'

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(dto: PostRevieDto): Promise<any> {
    const obj = omit(dto, "productId");

    const product = await this.prisma.product.update({
      where: { id: dto.productId },
      data: {
        reviews: {
          create: obj
        },
      },
      include: {
        reviews: true
      }
    });
    return product;
  }
}
