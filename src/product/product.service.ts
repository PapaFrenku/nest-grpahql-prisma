import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Product, Review } from '@prisma/client';
import { FindAllProductDto } from './dto/find-all-product.dto';
import { omit } from 'lodash';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async findAll(dto: FindAllProductDto): Promise<Product[]> {
    return await this.prisma.product.findMany({
      ...dto,
      include: { reviews: true, characteristics: true },
    });
  }

  async findById(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: { id },
      include: { reviews: true, characteristics: true },
    });
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const res = await this.prisma.product.create({
      data: omit(productDto, 'characteristics'),
    });
    if (productDto?.characteristics.length) {
      const data = productDto.characteristics.map((item) => ({
        ...item,
        productId: res.id,
      }));
      await this.prisma.productCharacteristic.createMany({ data });
    }
    return res;
  }

  async delete(id: number): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }

  async findBySecondCategory(category: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: { categories: { hasSome: category } },
      include: { reviews: true, characteristics: true },
      take: 10,
    });
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const res = await this.prisma.product.update({
      where: { id },
      data: { ...omit(dto, 'characteristics'), 
        characteristics: {
          createMany: {
            data: dto.characteristics 
          }
        }
      },
      include: {
        characteristics: true,
        reviews: true
      }
    });

    // if (dto.characteristics.length) {
    //   console.log(dto.characteristics)
    //   await Promise.all(
    //     dto.characteristics.map(async (item) => {
    //       console.log(item)
    //       await this.prisma.productCharacteristic.update({
    //         where: { id },
    //         data: item,
    //       });
    //     }),
    //   );
    // }

    return res;
  }

  async getReviewAvg(id: number): Promise<any> {
    return await this.prisma.review.aggregate({
      where: {
        productId: id,
      },
      _avg: {
        rating: true,
      },
    });
  }

  async findByText(query: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        reviews: true,
        characteristics: true
      }
    });
  }
}
