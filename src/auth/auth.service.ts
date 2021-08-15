import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthDto} from './dto/auth.dto';
import {UserEntity} from './user.entity';
import {genSalt, hash, compare} from 'bcryptjs';
import {
  User,
  Prisma
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createUser(dto: Prisma.UserCreateInput): Promise<User> {
    const salt = await genSalt(10);
    return await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password, salt),
      }
    });
  }

  async findUser(email: string): Promise<User> {
    return this.prisma.user.findUnique({where: {email}})
  }

  async validateUser(
      email: string,
      password: string,
  ): Promise<Pick<UserEntity, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isCorrect = compare(password, user.password);

    if (!isCorrect) {
      throw new UnauthorizedException('Wrong password');
    }

    return {
      email: user.email,
    };
  }

  async login(email: string) {
    const payload = {email};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
