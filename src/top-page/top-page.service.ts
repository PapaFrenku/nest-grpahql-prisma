import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory, TopPageEntity } from './top-page.entity';
import { omit } from 'lodash';

@Injectable()
export class TopPageService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateTopPageDto) {
    const topPage = omit(dto, ['hh', 'advantages']);
    if (dto.hh) {
      return await this.prisma.topPage.create({
        data: {
          ...topPage,
          hh: {
            create: {
              ...dto.hh,
            },
          },
          advantages: {
            create: dto.advantages,
          },
        },
      });
    }
    return await this.prisma.topPage.create({
      data: {
        ...topPage,
        advantages: {
          create: dto.advantages,
        },
      },
    });
  }

  async findById(id: number) {
    return this.prisma.topPage.findUnique({ where: { id } });
  }

  async findByAlias(alias: string) {
    return this.prisma.topPage.findUnique({ where: { alias } });
  }

  async findAll() {
    const res = await this.prisma.topPage.findMany({
      orderBy: { title: 'asc' },
    });
    return res;
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.prisma.topPage.findMany({ where: { firstCategory } });
  }

  async findByText(searchQuery: string) {
    return this.prisma.topPage.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            metaDescription: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            category: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        advantages: true,
        hh: true
      }
    });
  }

  async deleteById(id: number) {
    return await this.prisma.topPage.delete({where: {id}})
  }

  async updateById(id: number, dto: CreateTopPageDto) {
    return this.prisma.topPage.update({where: {id}, data: {...dto}})
  }
}
