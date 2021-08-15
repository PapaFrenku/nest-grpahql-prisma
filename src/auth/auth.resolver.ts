import {BadRequestException} from '@nestjs/common';
import {Args, Mutation, Resolver, Query} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {AuthDto} from './dto/auth.dto';
import {UserEntity, AccesToken} from './user.entity';
import { User } from '@prisma/client';

@Resolver(of => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => UserEntity)
  async register(@Args('authDto') dto: AuthDto) {
    const old = await this.authService.findUser(dto.email);

    if (old) {
      throw new BadRequestException();
    }

    return this.authService.createUser(dto);
  }

  @Mutation(returns => AccesToken)
  async login(@Args('authDto') dto: AuthDto) {
    const {email} = await this.authService.validateUser(
        dto.email,
        dto.password,
    );

    return this.authService.login(email);
  }
  
  @Query(returns => UserEntity)
  async user(@Args('email') email: string) {
    return this.authService.findUser(email);
  }
}
